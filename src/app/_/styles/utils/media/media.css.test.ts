import { describe, expect, it } from "@jest/globals";
import { media } from "./media.css";

describe("media", () => {
  it("tablet", () => {
    expect(
      media({
        tablet: { content: "tablet" },
      })
    ).toEqual({
      "@media": {
        "screen and (min-width: 768px)": { content: "tablet" },
      },
    });
  });

  it("desktop", () => {
    expect(
      media({
        desktop: { content: "desktop" },
      })
    ).toEqual({
      "@media": {
        "screen and (min-width: 1024px)": { content: "desktop" },
      },
    });
  });

  it("tablet and desktop", () => {
    expect(
      media({
        tablet: { content: "tablet" },
        desktop: { content: "desktop" },
      })
    ).toEqual({
      "@media": {
        "screen and (min-width: 768px)": { content: "tablet" },
        "screen and (min-width: 1024px)": { content: "desktop" },
      },
    });
  });
});
