import { Provider } from "mobx-react";
import * as React from "react";
import { injectGlobal } from "styled-components";
import { Loading } from "~/components/modules";
import ErrorPage from "~/components/pages/ErrorPage";
import normalize from "~/components/styles/mixins/normalize";
import reset from "~/components/styles/mixins/reset";
import { Color, Font } from "~/components/styles/theme";
import { RootStore } from "~/store";

interface AppProps {
  store: RootStore;
  children: React.ReactNode;
}

interface AppState {
  children: React.ReactNode;
  error: Error | null;
}

injectGlobal`
  ${normalize};
  ${reset};

  html {
    font-family: ${Font.Sans};
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    color: ${Color.Grey800};
    background: ${Color.White};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /**
   * Suppress the focus outline on elements that cannot be accessed via keyboard
   * https://github.com/suitcss/base/blob/master/lib/base.css
   */
  [tabindex="-1"]:focus {
    outline: 0 !important;
  }
`;

export default class App extends React.PureComponent<AppProps, AppState> {
  static getDerivedStateFromProps(
    nextProps: AppProps,
    prevState: AppState
  ): Partial<AppState> | null {
    const { children } = prevState;

    if (children !== nextProps.children) {
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
    this.setState({ error: err });
  }

  render() {
    const { store, children } = this.props;

    return (
      <Provider store={store}>
        <>
          <Loading />
          {this.state.error ? (
            <ErrorPage error={this.state.error!} />
          ) : (
            children
          )}
        </>
      </Provider>
    );
  }
}
