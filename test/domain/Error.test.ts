import { normalizeError } from "~/domain/Error";

describe("normalizeError(err)", () => {
  it("should return an original instance", () => {
    const err = new Error("oops!");
    const normalized = normalizeError(err);

    expect(normalized).toBeInstanceOf(Error);
  });

  it("should normalize error with status code", () => {
    const err = new Error("oops!");
    err.status = 401;

    const normalized = normalizeError(err);

    expect(normalized).toHaveProperty("message", "oops!");
    expect(normalized).toHaveProperty("status", 401);
  });

  it("should return a 500 error if `status` is undefined", () => {
    const err = new Error("oops!");
    const normalized = normalizeError(err);

    expect(normalized).toHaveProperty("message", "oops!");
    expect(normalized).toHaveProperty("status", 500);
  });

  it("should override error message when production environment", () => {
    jest.doMock("~/config", () => ({
      default: {
        isProd: true
      }
    }));

    jest.resetModules();

    const err = new Error("oops!");
    const normalized = require("~/domain/Error").normalizeError(err);

    expect(normalized).toHaveProperty("message", "Internal Server Error");
    expect(normalized).toHaveProperty("status", 500);
  });
});
