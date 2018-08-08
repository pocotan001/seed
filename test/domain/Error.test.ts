import { normalizeError } from "~/domain/Error";

describe("normalizeError(err)", () => {
  it("should return an original instance", () => {
    const err = new Error("oops!");
    const normalizedError = normalizeError(err);

    expect(normalizedError).toBeInstanceOf(Error);
  });

  it("should normalize error with status code", () => {
    const err = new Error("oops!");
    err.status = 401;

    const normalizedError = normalizeError(err);

    expect(normalizedError).toHaveProperty("message", "oops!");
    expect(normalizedError).toHaveProperty("status", 401);
  });

  it("should return a 500 error if `status` is undefined", () => {
    const err = new Error("oops!");
    const normalizedError = normalizeError(err);

    expect(normalizedError).toHaveProperty("message", "oops!");
    expect(normalizedError).toHaveProperty("status", 500);
  });

  it("should override error message when production environment", () => {
    const err = new Error("oops!");

    process.env.NODE_ENV = "production";
    jest.resetModules();

    // tslint:disable-next-line:variable-name
    const _normalizeError = require("~/domain/Error").normalizeError;
    const normalizedError = _normalizeError(err);

    expect(normalizedError).toHaveProperty("message", "Internal Server Error");
    expect(normalizedError).toHaveProperty("status", 500);
  });
});
