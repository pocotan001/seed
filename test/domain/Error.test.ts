import { normalizeError } from "~/domain/Error";

describe("normalizeError(err)", () => {
  it("should return an original error object", () => {
    const err = new Error("oops!");
    err.status = 404;
    err.code = 1;

    const normalized = normalizeError(err);

    expect(normalized).toBeInstanceOf(Error);
    expect(normalized).toHaveProperty("message", "oops!");
    expect(normalized).toHaveProperty("status", 404);
    expect(normalized).toHaveProperty("code", 1);
  });

  it("should override error message when production environment", () => {
    jest.doMock("~/config", () => ({
      isProd: true
    }));

    jest.resetModules();

    const err = new Error("oops!");
    err.status = 500;

    const normalized = require("~/domain/Error").normalizeError(err);

    expect(normalized).toHaveProperty("message", "Internal Server Error");
  });
});
