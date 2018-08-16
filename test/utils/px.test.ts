import px from "~/utils/px";

describe("px(value)", () => {
  it("should convert a number to px", () => {
    expect(px(16)).toBe("16px");
    expect(px("16px")).toBe("16px");
  });
});
