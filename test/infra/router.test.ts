import createRouter, { Route, Router, RouterContext } from "~/infra/router";

describe("Router", () => {
  describe("createRouter(routes, ctx)", () => {
    it("should return a `Router` instance", () => {
      const routes: Route[] = [];
      const ctx: RouterContext = {} as any;
      const router = createRouter(routes, ctx);

      expect(router).toBeInstanceOf(Router);
      expect(router).toHaveProperty("routes", routes);
      expect(router).toHaveProperty("ctx", ctx);
    });
  });

  describe("#matchRoute(path)", () => {
    it("should match the route", () => {
      const route: Route = {
        path: "/a/:id",
        action: () => ({ render: () => ({}) })
      };

      const router = createRouter([route], {} as any);
      const result = router.matchRoute("/a/1");

      expect(result).not.toBeNull();
      expect(result).toHaveProperty("route.path", "/a/:id");
      expect(result).toHaveProperty("match.path", "/a/:id");
      expect(result).toHaveProperty("match.url", "/a/1");
      expect(result).toHaveProperty("match.params", { id: "1" });
      expect(result).toHaveProperty("match.isExact", true);
    });

    it("should not match the route", () => {
      const route: Route = {
        path: "/a/:id",
        action: () => ({ render: () => ({}) })
      };

      const router = createRouter([route], {} as any);
      const result = router.matchRoute("/none");

      expect(result).toBeNull();
    });
  });

  describe("#resolve(path, opts)", () => {
    it("should execute the matching route action and return its result", async () => {
      const fetch = jest.fn(() => true);
      const route: Route = {
        path: "/a/:id",
        action: jest.fn(() => ({
          fetch,
          components: () => [
            new Promise(resolve => resolve({ default: "A" })),
            new Promise(resolve => resolve({ default: "B" }))
          ],
          render: (A: string, B: string) => `${A} and ${B}`
        }))
      };

      const ctx: RouterContext = { a: true } as any;
      const router = createRouter([route], ctx);
      const result = await router.resolve("/a/1");

      expect(route.action).toHaveBeenCalledTimes(1);
      expect(route.action).toHaveBeenCalledWith({ id: "1" }, ctx);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBe("A and B");
    });

    it("should handle action errors", async () => {
      const route: Route = {
        path: "/a/:id",
        action: () => {
          throw new Error("oops!");
        }
      };

      const onError = jest.fn(err => err.message);
      const ctx: RouterContext = { onError } as any;
      const router = createRouter([route], ctx);
      const result = await router.resolve("/a/1");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), { id: "1" }, ctx);
      expect(result).toBe("oops!");
    });

    it("should handle components errors", async () => {
      const route: Route = {
        path: "/a/:id",
        action: jest.fn(() => ({
          components: () => [Promise.reject(new Error("oops!"))],
          render: () => ({})
        }))
      };

      const onError = jest.fn(err => err.message);
      const ctx: RouterContext = { onError } as any;
      const router = createRouter([route], ctx);
      const result = await router.resolve("/a/1");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), { id: "1" }, ctx);
      expect(result).toBe("oops!");
    });

    it("should handle fetch errors", async () => {
      const route: Route = {
        path: "/a/:id",
        action: jest.fn(() => ({
          fetch: () => Promise.reject(new Error("oops!")),
          render: () => ({})
        }))
      };

      const onError = jest.fn(err => err.message);
      const ctx: RouterContext = { onError } as any;
      const router = createRouter([route], ctx);
      const result = await router.resolve("/a/1");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), { id: "1" }, ctx);
      expect(result).toBe("oops!");
    });

    it("should handle 404 error", async () => {
      const route: Route = {
        path: "/a/:id",
        action: () => ({ render: () => ({}) })
      };

      const onError = jest.fn(() => "oops!");
      const ctx: RouterContext = { onError } as any;
      const router = createRouter([route], ctx);
      const result = await router.resolve("/none");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), {}, ctx);
      expect(result).toBe("oops!");
    });

    it("should support `skipFetch` option", async () => {
      const fetch = jest.fn(() => true);
      const route: Route = {
        path: "/a/:id",
        action: jest.fn(() => ({
          fetch,
          render: () => true
        }))
      };

      const router = createRouter([route], {} as any);
      const result = await router.resolve("/a/1", { skipFetch: true });

      expect(route.action).toHaveBeenCalledTimes(1);
      expect(fetch).not.toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
