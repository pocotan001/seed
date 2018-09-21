import * as React from "react";
import { RouterContext } from "~/infra/router";
import home from "~/routes/home";

const HomePage = () => <div>Test</div>;
let ctx: RouterContext;

describe("home", () => {
  beforeEach(() => {
    ctx = {} as any;
  });

  describe("components()", () => {
    it("should return the components", () => {
      const components = home("", {}, ctx).components!();

      expect(components).toHaveProperty("0", expect.any(Object));
      expect(components).toHaveLength(1);
    });
  });

  describe("render(...components)", () => {
    it("should return the correct properties", () => {
      const route = home("", {}, ctx).render(HomePage);

      expect(route).toHaveProperty("chunks", ["home"]);
      expect(route).toHaveProperty("component", expect.any(Object));
      expect(route).toHaveProperty("title", expect.any(String));
      expect(route).toHaveProperty("meta", expect.any(Array));
    });
  });
});
