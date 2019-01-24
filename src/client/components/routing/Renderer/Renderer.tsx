import { Location } from "history";
import React from "react";
import {
  Route,
  RouteComponentProps as ReactRouterRouteComponentProps
} from "react-router";
import { Operations } from "../../../state/Operations";
import Fallback from "../../pages/Fallback";
import { RouteComponent } from "../../routing/RouteComponent";

interface RendererProps {
  location: Location;
  operations: Operations;
  Component: RouteComponent | null;
}

const Renderer: React.FC<RendererProps> = ({
  location,
  operations,
  Component
}) => {
  const render = (
    props: ReactRouterRouteComponentProps<any>
  ): React.ReactNode =>
    Component ? <Component {...props} operations={operations} /> : <Fallback />;

  return <Route location={location} render={render} />;
};

export default Renderer;
