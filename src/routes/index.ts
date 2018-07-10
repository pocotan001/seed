import { IRoute } from "~/infrastructure/router";
import cat from "./cat";
import home from "./home";
import markdown from "./markdown";

const routes: IRoute[] = [
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
