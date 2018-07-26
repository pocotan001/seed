import { Location, LocationListener } from "history";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "~/components/App";
import config from "~/config";
import { ElementId } from "~/enums/Dom";
import createLogger from "~/infrastructure/logger";
import createRequest from "~/infrastructure/request";
import createRouter from "~/infrastructure/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState, { State } from "~/store/state";
import head from "./reactions/head";
import session from "./reactions/session";
import * as serviceWorker from "./serviceWorker";

const initialState: State = (window as any).__STATE;
const sessionState = window.sessionStorage.getItem("session");

if (sessionState) {
  initialState.session = {
    ...initialState.session,
    ...JSON.parse(sessionState)
  };
}

const log = createLogger("[app]");
const history = createHistory();
const api = createRequest({ baseURL: "/api" });
const state = createState(initialState);
const store = createStore(state, { history, api });
const router = createRouter(routes, { store, onError: onRouteError });
const container = document.getElementById(ElementId.APP);

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
        store.head.setTitle(route.title);
        store.head.setMeta(route.meta);
      }
    );
  } catch (err) {
    // Probably fatal error
    log.error(err);

    if (!hydrate && location.key === history.location.key) {
      window.location.reload();
    }
  }
};

const hydrate = async () => {
  await render(history.location, {
    hydrate: true,
    skipFetch: !state.app.hasError
  });

  log.debug("Hydrated with state: %o", initialState);
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
session(state);
history.listen(onLocationChange);
hydrate();

window.addEventListener("load", () => {
  if (config.isProd) {
    serviceWorker.register();
  } else {
    serviceWorker.unregister();
  }
});

if (module.hot) {
  module.hot.accept(["../components/App", "../routes"], () => {
    router.routes = require("../routes").default;
    router.ctx.onError = require("../routes").onRouteError;
    render(history.location, { skipFetch: true });
  });
}
