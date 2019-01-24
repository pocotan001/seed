import { RouteComponentProps as ReactRouterRouteComponentProps } from "react-router";
import { Operations } from "../../state/Operations";

export interface RouteComponentProps
  extends ReactRouterRouteComponentProps<any> {
  operations: Operations;
}

export type RouteComponent = React.ComponentType<RouteComponentProps>;
