import { RequestHandler } from "express-serve-static-core";
import createHistory from "history/createMemoryHistory";
import { toJS } from "mobx";
import { useStaticRendering } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import App from "~/components/App";
import Head from "~/components/modules/Head";
import Scripts from "~/components/modules/Scripts";
import createLogger from "~/infrastructure/logger";
import createRequest from "~/infrastructure/request";
import createRouter from "~/infrastructure/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState from "~/store/state";
import * as chunks from "./chunk-manifest.json";

const DEFAULT_CHUNKS = ["vendors", "main"];
const log = createLogger("[app]");

const getAvailableChunks = (targets: string[] = []) =>
  [...DEFAULT_CHUNKS, ...targets]
    .map(target => {
      if (!chunks[target]) {
        log.warn(`Chunk with name "${target}" cannot be found`);
      }

      return chunks[target];
    })
    .filter(Boolean);

useStaticRendering(true);

const render = (): RequestHandler => async (req, res, next) => {
  try {
    const history = createHistory({ initialEntries: [req.originalUrl] });
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

    res.header("Content-Type", "text/html");
    res.status(route.status || 200);
    res.write('<!DOCTYPE html><html lang="ja">');

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

    res.write(`${head}<body><div id="app">`);

    const sheet = new ServerStyleSheet();
    const app = sheet.collectStyles(<App store={store}>{route.component}</App>);
    const stream = sheet.interleaveWithNodeStream(
      ReactDOM.renderToNodeStream(app)
    );

    stream.pipe(res, { end: false });

    stream.on("end", () => {
      const scripts = ReactDOM.renderToStaticMarkup(
        <Scripts
          state={toJS(state)}
          srcs={availableChunks}
          nonce={res.locals.nonce}
        />
      );

      res.end(`</div>${scripts}</body></html>`);
    });
  } catch (err) {
    next(err);
  }
};

export default render;
