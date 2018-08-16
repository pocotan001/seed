import serializeParams from "~/utils/serializeParams";

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
