import consola from "consola";
import { Action, History, Location } from "history";
import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { match as Match } from "react-router";
import { matchRoutes } from "react-router-config";
import { RouteComponent } from "../../../components/routing/RouteComponent";
import { RouteConfig } from "../../../routes";
import { Operations } from "../../../state/Operations";
import { State } from "../../../state/State";
import Renderer from "./Renderer";

interface StateProps {
  location: Location;
  routerAction: Action;
}

interface OwnProps {
  history: History;
  operations: Operations;
  routes: RouteConfig[];
}

type ConnectedRendererProps = StateProps & OwnProps;

interface ConnectedRendererState {
  Component: RouteComponent | React.ComponentType<any> | null;
}

interface MatchedRoute {
  route: RouteConfig;
  match: Match;
}

const mapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  State
> = state => ({
  location: state.router.location,
  routerAction: state.router.action
});

const visited = new Set<string>();

class ConnectedRenderer extends React.Component<
  ConnectedRendererProps,
  ConnectedRendererState
> {
  state: ConnectedRendererState = {
    Component: null
  };

  async load(
    path: string
  ): Promise<RouteComponent | React.ComponentType<any> | null> {
    try {
      const [matched] = matchRoutes(this.props.routes, path) as MatchedRoute[];

      if (matched.route.component) {
        return matched.route.component;
      }

      if (matched.route.lazy) {
        const component = await matched.route.lazy();

        return component.default;
      }
    } catch (err) {
      // Error goes to the `<Catcher>`
      this.setState(() => {
        throw err;
      });
    }

    return null;
  }

  async componentDidMount(): Promise<void> {
    const Component = await this.load(this.props.location.pathname);

    this.setState({ Component });
  }

  shouldComponentUpdate(
    nextProps: ConnectedRendererProps,
    nextState: ConnectedRendererState
  ): boolean {
    const { routes, location } = this.props;
    const { Component } = this.state;

    if (location !== nextProps.location) {
      return true;
    }

    if (Component !== nextState.Component) {
      return true;
    }

    if (routes !== nextProps.routes) {
      return true;
    }

    return false;
  }

  async componentDidUpdate(): Promise<void> {
    const { operations, location, history, routerAction } = this.props;

    const isVisited =
      routerAction === "POP" && location.key && visited.has(location.key);

    if (!isVisited) {
      operations.loading.start();
    }

    const Component = await this.load(location.pathname);

    if (location.key) {
      visited.add(location.key);
    }

    const isAborted = location !== history.location;

    if (isAborted) {
      consola.debug(`Aborted rendering of "${location.pathname}"`);
      return;
    }

    this.setState({ Component }, () => {
      if (isVisited) {
        return;
      }

      window.scrollTo(0, 0);
      operations.loading.finish();
    });
  }

  render(): React.ReactNode {
    const { location, operations } = this.props;

    return (
      <Renderer
        location={location}
        operations={operations}
        Component={this.state.Component}
      />
    );
  }
}

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  ConnectedRenderer
);
