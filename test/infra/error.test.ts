import { ErrorCode, normalizeError } from "~/infra/error";

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
    expect(normalizedError).toHaveProperty("code", ErrorCode.UNAUTHENTICATED);
  });

  it("should return a 500 error if `status` is undefined", () => {
    const err = new Error("oops!");
    const normalizedError = normalizeError(err);

    expect(normalizedError).toHaveProperty("message", "oops!");
    expect(normalizedError).toHaveProperty("status", 500);
    expect(normalizedError).toHaveProperty("code", ErrorCode.INTERNAL);
  });

  it("should override error message when production environment", () => {
    const err = new Error("oops!");

    process.env.NODE_ENV = "production";
    jest.resetModules();

    // tslint:disable-next-line:variable-name
    const _normalizeError = require("~/infra/error").normalizeError;
    const normalizedError = _normalizeError(err);

    expect(normalizedError).toHaveProperty("message", "Internal Server Error");
    expect(normalizedError).toHaveProperty("status", 500);
    expect(normalizedError).toHaveProperty("code", ErrorCode.INTERNAL);
  });
});
