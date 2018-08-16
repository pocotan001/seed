import em from "~/utils/em";

describe("em(value)", () => {
  it("should convert a number to em", () => {
    expect(em(16)).toBe("1em");
    expect(em("1em")).toBe("1em");
  });
});
