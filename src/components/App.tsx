import { Provider } from "mobx-react";
import * as React from "react";
import Loading from "~/components/modules/Loading";
import ErrorPage from "~/components/pages/ErrorPage";
import normalize from "~/components/styles/mixins/normalize";
import reset from "~/components/styles/mixins/reset";
import theme from "~/components/styles/theme";
import { RootStore } from "~/store";
import { injectGlobal, ThemeProvider } from "./styles/themedStyledComponents";

interface IAppProps {
  store: RootStore;
  children: React.ReactNode;
}

interface IAppState {
  children: React.ReactNode;
  error: Error | null;
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

export default class App extends React.PureComponent<IAppProps, IAppState> {
  static getDerivedStateFromProps(
    nextProps: IAppProps,
    prevState: IAppState
  ): Partial<IAppState> | null {
    const { children } = prevState;

    if (children !== nextProps.children) {
      nextProps.store.app.unmarkAsError();

      return {
        children: nextProps.children,
        error: null
      };
    }

    return null;
  }

  state = {
    children: this.props.children,
    error: null
  };

  componentDidCatch(err: Error) {
    const { store } = this.props;

    this.setState({ error: err });
    store.app.markAsError();
  }

  render() {
    const { store, children } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <Loading />
            {this.state.error ? (
              <ErrorPage error={this.state.error!} />
            ) : (
              children
            )}
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
