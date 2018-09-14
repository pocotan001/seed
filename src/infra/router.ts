import { Location } from "history";
import { STATUS_CODES } from "http";
import * as React from "react";
import { match as Match, matchPath } from "react-router";
import { JsonLd } from "~/domain/Document";
import { ErrorCode } from "~/domain/Error";
import createLogger from "~/infra/logger";
import { RootStore } from "~/store";
import { State } from "~/store/state";

export interface Route {
  path: string;
  exact?: boolean;
  strict?: boolean;
  location?: Location;
  action: RouteAction<any>;
}

export type RouteAction<P = {}> = (
  path: string,
  params: Match<P>["params"],
  ctx: RouterContext
) => {
  components?: () => Array<Promise<{ default: React.ComponentType<any> }>>;
  fetch?: () => Promise<any>;
  render: (...components: Array<React.ComponentType<any>>) => RouteActionResult;
};

export type RouteErrorAction<P = {}> = (
  err: Error,
  path: string,
  params: Match<P>["params"],
  ctx: RouterContext
) => RouteActionResult;

export interface RouteActionResult {
  status?: number;
  redirect?: string;
  chunks?: string[];
  component?: React.ReactNode;
  title?: string;
  meta?: State["head"]["meta"];
  link?: State["head"]["link"];
  jsonLd?: JsonLd[];
}

export interface RouterContext {
  store: RootStore;
  onError: RouteErrorAction;
}

export interface MatchedRoute<P> {
  route: Route;
  match: Match<P>;
}

const log = createLogger("[router]");

export class Router {
  routes: Route[];
  ctx: RouterContext;

  constructor(routes: Route[], ctx: RouterContext) {
    this.routes = routes;
    this.ctx = ctx;
  }

  matchRoute<P = {}>(path: string): MatchedRoute<P> | null {
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
  ): Promise<RouteActionResult> {
    const matched = this.matchRoute<P>(path);

    if (!matched) {
      const err = new Error(STATUS_CODES[404]);

      err.status = 404;
      err.code = ErrorCode.NotFound;

      return this.ctx.onError(err, path, {}, this.ctx);
    }

    const { route, match } = matched;

    try {
      const action = route.action(path, match.params, this.ctx);
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
      log.error(err.stack);

      return this.ctx.onError(err, path, match.params, this.ctx);
    }
  }
}

const createRouter = (routes: Route[], ctx: RouterContext) =>
  new Router(routes, ctx);

export default createRouter;
