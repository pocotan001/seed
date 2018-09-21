import { RouterContext } from "~/infra/router";
import onRouteError from "~/routes/onRouteError";

let ctx: RouterContext;

describe("onRouteError", () => {
  beforeEach(() => {
    ctx = {} as any;
  });

  it("should return the correct properties", () => {
    const err = new Error("oops!");
    err.status = 500;
    const route = onRouteError(err, "", {}, ctx);

    expect(route).toHaveProperty("status", 500);
    expect(route).toHaveProperty("component", expect.any(Object));
    expect(route).toHaveProperty("title", expect.any(String));
    expect(route).toHaveProperty(
      "meta",
      expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }])
    );
  });

  it("should return the redirect property if 401 received", () => {
    const err = new Error("oops!");
    err.status = 401;
    const route = onRouteError(err, "", {}, ctx);

    expect(route).toHaveProperty("redirect", expect.any(String));
  });
});
