import { Location, LocationListener } from "history";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "~/components/App";
import config from "~/config";
import createLogger from "~/infrastructure/logger";
import createRequest from "~/infrastructure/request";
import createRouter from "~/infrastructure/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState, { State } from "~/store/state";
import head from "./reactions/head";
import * as sw from "./sw";

const { __STATE }: { __STATE: State } = window as any;

const log = createLogger("[app]");
const history = createHistory();
const api = createRequest({ baseURL: "/api" });
const state = createState(__STATE);
const store = createStore(state, { history, api });
const router = createRouter(routes, { store, onError: onRouteError });
const container = document.getElementById("app");

const render = async (
  location: Location,
  opts: { hydrate?: boolean; skipFetch?: boolean } = {}
) => {
  try {
    const route = await router.resolve(location.pathname, {
      skipFetch: opts.skipFetch
    });

    if (location.key !== history.location.key) {
      log.info("Canceled rendering of %o", location.pathname);
      return;
    }

    if (route.redirect) {
      log.info("Redirecting to %o", route.redirect);
      history.replace(route.redirect);
      return;
    }

    (opts.hydrate ? ReactDOM.hydrate : ReactDOM.render)(
      <App store={store}>{route.component}</App>,
      container,
      () => {
        store.head.updateTitle(route.title);
        store.head.updateMeta(route.meta);
      }
    );
  } catch (err) {
    log.error(err);
  }
};

const hydrate = async () => {
  await render(history.location, { hydrate: true });
  log.debug("Hydrated with state: %o", __STATE);
};

const onLocationChange: LocationListener = async (location, action) => {
  const skipFetch = action === "POP" && store.history.isVisited(location.key);

  if (!skipFetch) {
    store.loading.start();
  }

  store.history.updateLocation(location);
  await render(location, { skipFetch });

  if (!skipFetch && location.key === history.location.key) {
    store.loading.finish();
    window.scrollTo(0, 0);
  }
};

log.info("Booting in %o mode", config.env);
head(state);
history.listen(onLocationChange);
hydrate();

if (config.isProd) {
  sw.register();
} else {
  sw.unregister();
}

if (module.hot) {
  module.hot.accept(["../components/App", "../routes"], () => {
    router.routes = require("../routes").default;
    router.ctx.onError = require("../routes").onRouteError;
    render(history.location, { skipFetch: true });
  });
}
