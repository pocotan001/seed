import {
  isDataUri,
  isEmail,
  isLength,
  isNumeric,
  isRequired
} from "~/domain/validators";

describe("isRequired(value)", () => {
  it("should return true", () => {
    expect(isRequired("alo")).toBe(true);
  });

  it("should return false", () => {
    expect(isRequired("")).toBe(false);
  });
});

describe("isNumeric(value)", () => {
  it("should return true", () => {
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("123")).toBe(true);
    expect(isNumeric("0123")).toBe(true);
    expect(isNumeric("-123")).toBe(true);
    expect(isNumeric("+123")).toBe(true);
    expect(isNumeric("123.4")).toBe(true);
  });

  it("should return false", () => {
    expect(isNumeric("alo")).toBe(false);
  });
});

describe("isLength(value)", () => {
  it("should return true", () => {
    expect(isLength({ min: 3 })("abc")).toBe(true);
    expect(isLength({ max: 3 })("abc")).toBe(true);
    expect(isLength({ min: 3, max: 3 })("abc")).toBe(true);
  });

  it("should return false", () => {
    expect(isLength({ min: 3 })("ab")).toBe(false);
    expect(isLength({ max: 3 })("abcd")).toBe(false);
    expect(isLength({ min: 3, max: 3 })("ab")).toBe(false);
    expect(isLength({ min: 3, max: 3 })("abcd")).toBe(false);
  });
});

describe("isEmail(value)", () => {
  it("should return true", () => {
    expect(isEmail("foo@example.com")).toBe(true);
  });

  it("should return false", () => {
    expect(isEmail("@")).toBe(false);
    expect(isEmail("foo@")).toBe(false);
    expect(isEmail("example.com")).toBe(false);
    expect(isEmail("@example.com")).toBe(false);
    expect(isEmail("foo@example.com.")).toBe(false);
  });
});

describe("isDataUri(value)", () => {
  it("should return true", () => {
    expect(isDataUri("data:,")).toBe(true);
    expect(isDataUri("data:text/plain;base64,YWxv")).toBe(true);
  });

  it("should return false", () => {
    expect(isDataUri("data")).toBe(false);
    expect(isDataUri("base64")).toBe(false);
    expect(isDataUri("https://example.com")).toBe(false);
  });
});
