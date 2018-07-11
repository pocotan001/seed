import { em, isDataUri, px, serializeParams } from "~/infrastructure/utils";

describe("sleep(ms)", () => {
  it("should sleep", () => {
    jest.useFakeTimers();
    const { sleep } = require("~/infrastructure/utils");

    sleep(1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});

describe("isDataUri(uri)", () => {
  it("should return true for valid data uri", () => {
    expect(isDataUri("data:,")).toBe(true);
    expect(isDataUri("data:text/plain;base64,YWxv")).toBe(true);
  });

  it("should return false for invalid strings", () => {
    expect(isDataUri("")).toBe(false);
    expect(isDataUri("http://example.com/")).toBe(false);
  });
});

describe("serializeParams(params)", () => {
  it("should return serialized params", async () => {
    expect(serializeParams({})).toBe("{}");
    expect(serializeParams({ a: "1", b: 2, c: true })).toBe(
      '{"a":"1","b":2,"c":true}'
    );
  });

  it("should sort params", async () => {
    expect(serializeParams({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
    expect(serializeParams({ b: 2, a: 1 })).toBe('{"a":1,"b":2}');
  });
});

describe("px(value)", () => {
  it("should convert a number to px", () => {
    expect(px(16)).toBe("16px");
    expect(px("16px")).toBe("16px");
  });
});

describe("em(value)", () => {
  it("should convert a number to em", () => {
    expect(em(16)).toBe("1em");
    expect(em("1em")).toBe("1em");
  });
});
