import { StorybookConfig } from "@storybook/nextjs";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";

const config: StorybookConfig = {
  typescript: { reactDocgen: false },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["./public", "../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    // HACK: vanilla-extract 向けのワークアラウンド対応
    //       https://github.com/vanilla-extract-css/vanilla-extract/discussions/371#discussioncomment-1379902
    const cssRule = config.module?.rules?.find((rule) =>
      (rule as any)?.test?.test("test.css")
    ) as RuleSetRule;
    cssRule.test = /.*(?<!\.vanilla)\.css$/;

    return {
      ...config,
      plugins: [
        ...(config.plugins ?? []),
        new VanillaExtractPlugin(),
        new MiniCssExtractPlugin(),
      ],
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules ?? []),
          // https://vanilla-extract.style/documentation/integrations/webpack/
          {
            test: /\.vanilla\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve("css-loader"),
                options: {
                  // Required as image imports should be handled via JS/TS import statements
                  url: false,
                },
              },
            ],
          },
        ],
      },
    };
  },
};

export default config;
