import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { RouteConfig } from "../routes";
import { Operations } from "../state/Operations";
import Catcher from "./routing/Catcher";
import Loading from "./routing/Loading";
import Renderer from "./routing/Renderer";
import GlobalStyle from "./styles/GlobalStyle";

interface AppProps {
  store: Store;
  history: History;
  persistor: Persistor;
  operations: Operations;
  routes: RouteConfig[];
}

const SITE_NAME = "Seed";

const App: React.FC<AppProps> = ({
  store,
  history,
  persistor,
  operations,
  routes
}) => (
  <Provider store={store}>
    <>
      <Helmet defaultTitle={SITE_NAME} titleTemplate={`%s - ${SITE_NAME}`} />
      <GlobalStyle />
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Catcher>
            <Loading />
            <Renderer
              history={history}
              routes={routes}
              operations={operations}
            />
          </Catcher>
        </ConnectedRouter>
      </PersistGate>
    </>
  </Provider>
);

export default App;
