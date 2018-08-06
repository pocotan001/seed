import { Location } from "history";
import { STATUS_CODES } from "http";
import * as React from "react";
import { match as IMatch, matchPath } from "react-router";
import createLogger from "~/infra/logger";
import { RootStore } from "~/store";
import { State } from "~/store/state";

export interface IRoute {
  path: string;
  exact?: boolean;
  strict?: boolean;
  location?: Location;
  action: IRouteAction<any>;
}

export type IRouteAction<P = {}> = (
  params: IMatch<P>["params"],
  ctx: IRouterContext
) => {
  components?: () => Array<Promise<{ default: React.ComponentType<any> }>>;
  fetch?: () => Promise<any>;
  render: (
    ...components: Array<React.ComponentType<any>>
  ) => IRouteActionResult;
};

export type IRouteErrorAction<P = {}> = (
  err: Error,
  params: IMatch<P>["params"],
  ctx: IRouterContext
) => IRouteActionResult;

export interface IRouteActionResult {
  status?: number;
  redirect?: string;
  chunks?: string[];
  component?: React.ReactNode;
  title?: string;
  meta?: State["head"]["meta"];
  link?: State["head"]["link"];
}

export interface IRouterContext {
  store: RootStore;
  onError: IRouteErrorAction;
}

export interface IMatchedRoute<P> {
  route: IRoute;
  match: IMatch<P>;
}

const log = createLogger("[router]");

export class Router {
  routes: IRoute[];
  ctx: IRouterContext;

  constructor(routes: IRoute[], ctx: IRouterContext) {
    this.routes = routes;
    this.ctx = ctx;
  }

  matchRoute<P = {}>(path: string): IMatchedRoute<P> | null {
    for (const route of this.routes) {
      const match = matchPath<P>(path, route);

      if (match) {
        return { route, match };
      }
    }

    return null;
  }

  async resolve<P = {}>(
    path: string,
    opts: { skipFetch?: boolean } = {}
  ): Promise<IRouteActionResult> {
    const matched = this.matchRoute<P>(path);

    if (!matched) {
      const err = new Error(STATUS_CODES[404]);
      err.status = 404;

      return this.ctx.onError(err, {}, this.ctx);
    }

    const { route, match } = matched;

    try {
      const action = route.action(match.params, this.ctx);
      const [, ...components] = await Promise.all([
        action.fetch && !opts.skipFetch ? action.fetch() : null,
        ...(action.components
          ? action.components().map(component => component.then(x => x.default))
          : [])
      ]);

      if (action.fetch && opts.skipFetch) {
        log.debug("Skipped fetching from %o", match.url);
      }

      return action.render(...components);
    } catch (err) {
      err.status = err.status || 500;
      log.error(`Receive error with status %o`, err.status);

      return this.ctx.onError(err, match.params, this.ctx);
    }
  }
}

const createRouter = (routes: IRoute[], ctx: IRouterContext) =>
  new Router(routes, ctx);

export default createRouter;
