import { Preview } from "@storybook/react";
import { colors } from "../src/app/_/styles/theme/tokens";
import "the-new-css-reset/css/reset.css";
import "../src/app/_/styles/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Light",
      values: [
        {
          name: "Light",
          value: colors["gray.50"],
        },
        {
          name: "Dark",
          value: colors["gray.900"],
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
