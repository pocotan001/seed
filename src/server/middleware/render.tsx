import { Request, RequestHandler, Response } from "express-serve-static-core";
import createHistory from "history/createMemoryHistory";
import * as LRU from "lru-cache";
import { toJS } from "mobx";
import { useStaticRendering } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Transform } from "stream";
import { ServerStyleSheet } from "styled-components";
import App from "~/components/App";
import Head from "~/components/modules/Head";
import Scripts from "~/components/modules/Scripts";
import config from "~/config";
import createLogger from "~/infrastructure/logger";
import createRequest from "~/infrastructure/request";
import createRouter from "~/infrastructure/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState from "~/store/state";
import * as chunks from "./chunk-manifest.json";

const MAIN_CHUNKS = ["vendors", "main"];
const reNonceAttrs = / nonce=".*?"/g;
const log = createLogger("[render]");

// Leverage a strategy called micro-caching to drastically improve
// app's capability of handling high traffic
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const cache: LRU.Cache<string, Buffer> = new LRU({
  max: 100,
  maxAge: 1000 // Expires after 1 second
});

const isCacheable = (req: Request): boolean =>
  config.isProd && !req.session.accessToken;

const createCacheStream = (url: string): Transform => {
  const buffered: Buffer[] = [];

  return new Transform({
    transform(data, _, cb) {
      buffered.push(data);
      cb(undefined, data);
    },

    flush(cb) {
      cache.set(url, Buffer.concat(buffered));
      log.info("Cached: %o", url);
      cb();
    }
  });
};

const getAvailableChunks = (targets: string[] = []): string[] =>
  [...MAIN_CHUNKS, ...targets]
    .map(target => {
      if (!chunks[target]) {
        log.warn("Chunk with name %o cannot be found", target);
      }

      return chunks[target];
    })
    .filter(Boolean);

useStaticRendering(true);

const render = (): RequestHandler => async (req, res, next) => {
  try {
    const url = req.originalUrl;

    if (isCacheable(req) && cache.has(url)) {
      const html = cache
        .get(url)!
        .toString()
        .replace(reNonceAttrs, ` nonce="${res.locals.nonce}"`);

      log.info("Cache hit: %o", url);
      res.send(html);
      return;
    }

    const history = createHistory({ initialEntries: [url] });
    const api = createRequest({
      baseURL: "/api",
      proxy: {
        host: "127.0.0.1",
        port: Number(process.env.PORT)
      }
    });
    const state = createState();
    const store = createStore(state, { history, api, req, res });
    const router = createRouter(routes, { store, onError: onRouteError });
    const route = await router.resolve(req.path);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const status = route.status || 200;
    let renderStream: Transform | Response;

    res.type("html").status(status);

    if (status === 200 && isCacheable(req)) {
      renderStream = createCacheStream(url);
      renderStream.pipe(res);
    } else {
      renderStream = res;
    }

    store.history.updateLocation(history.location);
    store.head.updateTitle(route.title);
    store.head.updateMeta(route.meta);

    const availableChunks = getAvailableChunks(route.chunks);
    const head = ReactDOM.renderToStaticMarkup(
      <Head
        title={state.head.title}
        meta={state.head.meta}
        scripts={availableChunks}
      />
    );

    renderStream.write(`<!DOCTYPE html><html>${head}<body><div id="app">`);

    const sheet = new ServerStyleSheet();
    const app = sheet.collectStyles(<App store={store}>{route.component}</App>);
    const appStream = sheet.interleaveWithNodeStream(
      ReactDOM.renderToNodeStream(app)
    );

    appStream.pipe(renderStream, { end: false });
    appStream.on("error", next);
    appStream.on("end", () => {
      const scripts = ReactDOM.renderToStaticMarkup(
        <Scripts
          state={toJS(state)}
          scripts={availableChunks}
          nonce={res.locals.nonce}
        />
      );

      renderStream.end(`</div>${scripts}</body></html>`);
    });
  } catch (err) {
    next(err);
  }
};

export default render;
