import { Meta, StoryObj } from "@storybook/react";
import { Entries } from "type-fest";
import { colors } from "./colors";

type Story = StoryObj;

const meta: Meta = {
  title: "Theme / colors",
};

// const example = {
//   gray: {
//     "50": "#fafafa",
//     "100": "#f5f5f5",
//     …
//   },
//   misc: {
//     white: "#ffffff",
//     black: "#000000",
//     transparent: "transparent",
//     …
//   },
// }
type ColorPalette = Record<string, Record<string, string>>;

const colorPalette: ColorPalette = (() => {
  let palette: ColorPalette = {};

  for (const [key, value] of Object.entries(colors) as Entries<typeof colors>) {
    const [hue, shade] = key.split(".");

    palette = {
      ...palette,
      ...(hue && shade
        ? {
            [hue]: {
              ...palette[hue],
              [shade]: value,
            },
          }
        : {
            misc: {
              ...palette["misc"],
              [key]: value,
            },
          }),
    };
  }

  return palette;
})();

export const Basic: Story = {
  render: () => (
    <>
      {Object.entries(colorPalette).map(([hue, shades]) => (
        <section
          key={hue}
          style={{
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "12px",
              textTransform: "capitalize",
            }}
          >
            {hue}
          </h1>
          <ul
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fill, minmax(5.5em, 1fr))",
            }}
          >
            {Object.entries(shades).map(([shade, value]) => (
              <li key={shade}>
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: value,
                    borderRadius: "4px",
                    marginBottom: "4px",
                  }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {shade}
                </p>
                <p
                  style={{
                    color: "#666",
                    fontSize: "10px",
                  }}
                >
                  <code>{value}</code>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  ),
};

export default meta;
