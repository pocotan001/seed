import { Location, LocationListener } from "history";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "~/components/App";
import config from "~/config";
import * as ElementId from "~/constants/ElementId";
import * as StorageKey from "~/constants/StorageKey";
import createLogger from "~/infra/logger";
import createRequest from "~/infra/request";
import createRouter from "~/infra/router";
import routes, { onRouteError } from "~/routes";
import createStore from "~/store";
import createState, { State } from "~/store/state";
import * as reaction from "./reaction";
import * as sw from "./sw";

const initialState: State = (window as any).__STATE;
const sessionString = window.sessionStorage.getItem(StorageKey.SESSION);

if (sessionString) {
  initialState.session = {
    ...initialState.session,
    ...JSON.parse(sessionString)
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

    if (opts.hydrate) {
      ReactDOM.hydrate(<App store={store}>{route.component}</App>, container);
    } else {
      ReactDOM.render(
        <App store={store}>{route.component}</App>,
        container,
        () => {
          store.head.setTitle(route.title);
          store.head.setMeta(route.meta);
          store.head.setLink(route.link);
        }
      );
    }
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
history.listen(onLocationChange);
reaction.start(state);
hydrate();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (config.isProd) {
      sw.register();
    } else {
      sw.unregister();
    }
  });
}

if (module.hot) {
  module.hot.accept(["../components/App", "../routes"], () => {
    router.routes = require("../routes").default;
    router.ctx.onError = require("../routes").onRouteError;
    render(history.location, { skipFetch: true });
  });
}
