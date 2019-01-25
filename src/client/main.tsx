import { routerMiddleware } from "connected-react-router";
import consola from "consola";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import App from "./components/App";
import createConfig from "./Config";
import createAPIClient from "./infra/client/APIClient";
import createRepositories from "./infra/repositories";
import createServiceWorker from "./infra/ServiceWorker";
import routes from "./routes";
import createReducer from "./state";
import createOperations from "./state/Operations";

const config = createConfig();
const history = createBrowserHistory();
const reducer = createReducer(history);
const enhancers = composeWithDevTools(
  applyMiddleware(routerMiddleware(history))
);
const store = createStore(reducer, enhancers);
const persistor = persistStore(store);
const api = createAPIClient(config.client.api.url);
const repositories = createRepositories(api);
const operations = createOperations(store.dispatch, persistor, repositories);
const sw = createServiceWorker();
const container = document.getElementById("app");

const render = (NextApp = App, nextRoutes = routes) => {
  ReactDOM.render(
    <NextApp
      store={store}
      history={history}
      persistor={persistor}
      operations={operations}
      routes={nextRoutes}
    />,
    container
  );
};

render();

if (config.env.isProd) {
  // `sw.js` will generate by workbox-webpack-plugin
  sw.register("/sw.js");
  // Disable all reporters
  consola.level = 0;
  consola.removeReporter();
} else {
  sw.unregister();
  consola.level = Number(process.env.CONSOLA_LEVEL);
}

if (module.hot) {
  module.hot.accept(["./components/App", "./routes"], () => {
    const NextApp = require("./components/App").default;
    const nextRoutes = require("./routes").default;
    render(NextApp, nextRoutes);
  });

  module.hot.accept("./state", () => {
    const createNextReducer = require("./state").default;
    store.replaceReducer(createNextReducer(history));
  });
}
