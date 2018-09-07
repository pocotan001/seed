import { Request, RequestHandler, Response } from "express-serve-static-core";
import createHistory from "history/createMemoryHistory";
import LRU from "lru-cache";
import { toJS } from "mobx";
import { useStaticRendering } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Transform } from "stream";
import { ServerStyleSheet } from "styled-components";
import App from "~/components/App";
import { Head, Scripts } from "~/components/modules";
import config from "~/config";
import { ElementId } from "~/domain/Document";
import createLogger from "~/infra/logger";
import createRequest from "~/infra/request";
import createRouter from "~/infra/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState, { State } from "~/store/state";
import * as chunks from "./chunk-manifest.json";

const MAIN_CHUNKS = ["vendor", "main"];
const reNonceAttrs = / nonce=".*?"/g;
const log = createLogger("[render]");

const api = createRequest({
  baseURL: "/api",
  proxy: {
    host: "127.0.0.1",
    port: Number(process.env.PORT)
  }
});

// Leverage a strategy called micro-caching to drastically improve
// app's capability of handling high traffic
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const cache: LRU.Cache<string, Buffer> = new LRU({
  max: 100, // Maximum number of items
  maxAge: 1000 // Expires after 1 second
});

const isCacheable = (req: Request): boolean =>
  config.isProd && !req.session.isPopulated;

const createCacheStream = (url: string): Transform => {
  const buffered: Buffer[] = [];

  return new Transform({
    transform(data, _, cb) {
      buffered.push(data);
      cb(undefined, data);
    },

    flush(cb) {
      const isCached = cache.set(url, Buffer.concat(buffered));

      if (isCached) {
        log.info("Cached: %o", url);
      }

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
    const { nonce } = res.locals;

    if (isCacheable(req) && cache.has(url)) {
      const html = cache
        .get(url)!
        .toString()
        .replace(reNonceAttrs, ` nonce="${nonce}"`);

      log.info("Cache hit: %o", url);
      res.send(html);
      return;
    }

    const history = createHistory({ initialEntries: [url] });
    const initialState: Partial<State> = {
      auth: {
        me: req.session.me
      },
      history: {
        origin: `${req.protocol}://${req.get("host")}`,
        location: history.location,
        visited: {}
      }
    };

    const state = createState(initialState);
    const store = createStore(state, { history, api });
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

    if (status === 200) {
      store.history.markAsVisited();
    }

    store.head.setTitle(route.title);
    store.head.setMeta(route.meta);
    store.head.setLink(route.link);

    const availableChunks = getAvailableChunks(route.chunks);
    const head = ReactDOM.renderToStaticMarkup(
      <Head
        title={state.head.title}
        meta={state.head.meta}
        link={state.head.link}
        scripts={availableChunks}
      />
    );

    renderStream.write(
      `<!DOCTYPE html><html>${head}<body><div id="${ElementId.App}">`
    );

    const sheet = new ServerStyleSheet();
    const app = sheet.collectStyles(<App store={store}>{route.component}</App>);
    const appStream = sheet.interleaveWithNodeStream(
      ReactDOM.renderToNodeStream(app)
    );

    appStream.pipe(
      renderStream,
      { end: false }
    );

    appStream.on("error", next);
    appStream.on("end", () => {
      const scripts = ReactDOM.renderToStaticMarkup(
        <Scripts state={toJS(state)} scripts={availableChunks} nonce={nonce} />
      );

      renderStream.end(
        `</div><div id="${ElementId.Modal}"></div>${scripts}</body></html>`
      );
    });
  } catch (err) {
    next(err);
  }
};

export default render;
