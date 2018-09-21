import * as React from "react";
import { RouterContext } from "~/infra/router";
import cat, { CATS_PER_PAGE } from "~/routes/cat";

const CatPage = () => <div>Test</div>;
let ctx: RouterContext;

describe("cat", () => {
  beforeEach(() => {
    ctx = {} as any;
  });

  describe("components()", () => {
    it("should return the components", () => {
      const components = cat("", { page: "1" }, ctx).components!();

      expect(components).toHaveProperty("0", expect.any(Object));
      expect(components).toHaveLength(1);
    });
  });

  describe("fetch()", () => {
    it("should call the correct methods", () => {
      ctx = {
        store: {
          cat: {
            fetchCats: jest.fn()
          }
        }
      } as any;

      cat("", { page: "1" }, ctx).fetch!();

      expect(ctx.store.cat.fetchCats).toHaveBeenCalledTimes(1);
    });
  });

  describe("render(...components)", () => {
    it("should return the correct properties", () => {
      ctx = {
        store: {
          state: {
            cats: {
              totalCount: 100
            }
          }
        }
      } as any;

      const route = cat("", { page: "1" }, ctx).render(CatPage);

      expect(route).toHaveProperty("title", expect.any(String));
      expect(route).toHaveProperty("chunks", ["cat"]);
      expect(route).toHaveProperty("component", expect.any(Object));
      expect(route).toHaveProperty("meta", expect.any(Array));
      expect(route).toHaveProperty("link", expect.any(Array));
      expect(route).toHaveProperty("jsonLd", expect.any(Array));
    });

    it("should return the redirect property if `param.page` is invalid", () => {
      const route = cat("", { page: "Not a number" }, ctx).render(CatPage);

      expect(route).toHaveProperty("redirect", "/cat/1");
    });

    it("should return the redirect property if page does not exists", () => {
      const totalCount = 100;
      const totalPages = totalCount / CATS_PER_PAGE;

      ctx = {
        store: {
          state: {
            cats: {
              totalCount
            }
          }
        }
      } as any;

      const routeA = cat("", { page: "-1" }, ctx).render(CatPage);
      const routeB = cat("", { page: "0" }, ctx).render(CatPage);
      const routeC = cat("", { page: String(totalPages + 1) }, ctx).render(
        CatPage
      );

      expect(routeA).toHaveProperty("redirect", "/cat/1");
      expect(routeB).toHaveProperty("redirect", "/cat/1");
      expect(routeC).toHaveProperty("redirect", "/cat/1");
    });
  });
});
