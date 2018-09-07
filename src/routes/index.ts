import { Route } from "~/infra/router";
import cat from "./cat";
import home from "./home";
import markdown from "./markdown";

const routes: Route[] = [
  {
    path: "/",
    exact: true,
    action: home
  },
  {
    path: "/markdown",
    action: markdown
  },
  {
    path: "/cat/:page?",
    action: cat
  }
];

export { default as onRouteError } from "./onRouteError";
export default routes;
