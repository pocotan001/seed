import { Provider } from "mobx-react";
import * as React from "react";
import Loading from "~/components/modules/Loading";
import normalize from "~/components/styles/mixins/normalize";
import reset from "~/components/styles/mixins/reset";
import theme from "~/components/styles/theme";
import { RootStore } from "~/store";
import { injectGlobal, ThemeProvider } from "./styles/themedStyledComponents";

interface IAppProps {
  store: RootStore;
  children: React.ReactNode;
}

injectGlobal`
  ${normalize};
  ${reset};

  html {
    font-family: ${theme.fonts.sans};
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    color: ${theme.colors.grey700};
    background: ${theme.colors.white};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  [tabindex="-1"]:focus {
    outline: none !important;
  }
`;

const App: React.SFC<IAppProps> = ({ store, children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Loading />
        {children}
      </>
    </ThemeProvider>
  </Provider>
);

export default App;
