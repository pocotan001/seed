import { RouteConfig as ReactRouterRouteConfig } from "react-router-config";
import NotFoundPage from "./components/pages/NotFoundPage";
import { RouteComponent } from "./components/routing/RouteComponent";

export interface RouteConfig extends ReactRouterRouteConfig {
  lazy?: () => Promise<{ default: RouteComponent }>;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    lazy: () =>
      import(/* webpackChunkName: "login" */ "./components/pages/LoginPage")
  },
  {
    path: "/dashboard",
    exact: true,
    lazy: () =>
      import(/* webpackChunkName: "dashboard" */ "./components/pages/DashboardPage")
  },
  {
    path: "*",
    component: NotFoundPage
  }
];

export default routes;
