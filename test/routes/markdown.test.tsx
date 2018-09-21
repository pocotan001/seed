import * as React from "react";
import { RouterContext } from "~/infra/router";
import markdown from "~/routes/markdown";

const MarkdownPage = () => <div>Test</div>;
let ctx: RouterContext;

describe("markdown", () => {
  beforeEach(() => {
    ctx = {} as any;
  });

  describe("components()", () => {
    it("should return the components", () => {
      const components = markdown("", {}, ctx).components!();

      expect(components).toHaveProperty("0", expect.any(Object));
      expect(components).toHaveLength(1);
    });
  });

  describe("render(...components)", () => {
    it("should return the correct properties", () => {
      const route = markdown("", {}, ctx).render(MarkdownPage);

      expect(route).toHaveProperty("chunks", ["markdown"]);
      expect(route).toHaveProperty("component", expect.any(Object));
      expect(route).toHaveProperty("title", expect.any(String));
      expect(route).toHaveProperty("meta", expect.any(Array));
      expect(route).toHaveProperty("jsonLd", expect.any(Array));
    });
  });
});
