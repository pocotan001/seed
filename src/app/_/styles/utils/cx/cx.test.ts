import { describe, expect, it } from "@jest/globals";
import { cx } from "./cx";

describe("composeClassNames", () => {
  it("todo", () => {
    expect(cx("todo")).toEqual({
      "@media": {
        "screen and (min-width: 768px)": { content: "tablet" },
      },
    });
  });
});
