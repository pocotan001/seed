import HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import * as webpack from "webpack";
import { SRC_DIR } from "./paths";

export const isDebug = process.env.NODE_ENV !== "production";

const baseConfig: webpack.Configuration = {
  mode: isDebug ? "development" : "production",
  bail: !isDebug,
  cache: isDebug,
  devtool: isDebug && ("inline-cheap-module-source-map" as any),
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: { "~": SRC_DIR }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: isDebug,
              presets: [
                [
                  "@babel/env",
                  {
                    forceAllTransforms: !isDebug,
                    modules: false,
                    useBuiltIns: "usage"
                  }
                ]
              ],
              plugins: [
                // https://github.com/styled-components/babel-plugin-styled-components
                [
                  "babel-plugin-styled-components",
                  {
                    displayName: isDebug
                  }
                ],
                ...(isDebug
                  ? []
                  : [
                      // https://babeljs.io/docs/en/next/babel-plugin-transform-react-constant-elements.html
                      "@babel/plugin-transform-react-constant-elements",
                      // https://babeljs.io/docs/en/next/babel-plugin-transform-react-inline-elements.html
                      "@babel/plugin-transform-react-inline-elements"
                    ])
              ]
            }
          },
          // Replace assets path
          {
            loader: "string-replace-loader",
            options: {
              multiple: [
                // for all strings except `from "..."` and `require("...")`
                {
                  search: `(?<! from |require\\()["'](~\/assets\/.+?)["']`,
                  replace: 'require("$1")',
                  flags: "g"
                },
                // for JSX props
                // e.g. `<img src="~/assets/xxx" />` -> `<img src={require("~/assets/xxx")} />`
                {
                  search: `=(require\\("~\/assets\/.+?"\\))`,
                  replace: "={$1}",
                  flags: "g"
                },
                // for `url()` CSS function
                // e.g. `background: url("~/assets/xxx")` -> `background: url(${require("~/assets/xxx")})`
                {
                  search: ` url\\((require\\("~\/assets\/.+?"\\))\\)`,
                  replace: " url($${$1})",
                  flags: "g"
                }
              ]
            }
          }
        ]
      },
      {
        test: /\/assets\/img\/.+\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          regExp: /\/(img\/.+)$/,
          name: isDebug ? "[1]" : "[hash].[ext]",
          limit: 4096 // 4KB
        }
      },
      {
        test: /\/assets\/icons\/.+\.svg$/,
        loader: "svg-inline-loader",
        options: {
          removeTags: true,
          removingTags: ["desc", "defs", "style"],
          removingTagAttrs: ["fill"]
        }
      }
    ]
  },
  plugins: [
    // https://github.com/mzgoddard/hard-source-webpack-plugin
    new HardSourceWebpackPlugin({
      info: { level: "warn" }
    })
  ],
  stats: {
    colors: true,
    errors: true,
    warnings: true,
    builtAt: false,
    hash: false,
    timings: false,
    version: false,
    entrypoints: false,
    modules: false
  } as any
};

export default baseConfig;
