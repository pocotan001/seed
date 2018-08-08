import * as HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import * as webpack from "webpack";
import * as pkg from "../../../package.json";
import { SRC_DIR } from "../paths";

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
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "8.10.0",
                      browsers: pkg.browserslist
                    },
                    modules: false
                  }
                ],
                ["@babel/preset-stage-2", { decoratorsLegacy: true }],
                ["@babel/preset-react", { development: isDebug }]
              ],
              plugins: [
                ...[
                  "babel-plugin-preval",
                  [
                    "babel-plugin-styled-components",
                    {
                      ssr: true,
                      displayName: isDebug
                    }
                  ]
                ],
                ...(isDebug
                  ? []
                  : [
                      // https://babeljs.io/docs/en/next/babel-plugin-transform-react-constant-elements.html
                      "@babel/plugin-transform-react-constant-elements",
                      // https://babeljs.io/docs/en/next/babel-plugin-transform-react-inline-elements.html
                      "@babel/plugin-transform-react-inline-elements",
                      // https://github.com/lodash/babel-plugin-lodash
                      "babel-plugin-lodash"
                    ])
              ]
            }
          },
          {
            loader: "ts-loader",
            options: { configFile: "tsconfig.esnext.json" }
          },
          // e.g. `<img src="~/assets/xxx" />` -> `<img src={require("~/assets/xxx")} />`
          {
            loader: "string-replace-loader",
            options: {
              search: `="(~\/assets\/.+?)"`,
              replace: `={require("$1")}`,
              flags: "g"
            }
          }
        ]
      },
      {
        test: /\/assets\/img\/.+\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: isDebug ? "img/[name].[ext]" : "img/[name].[hash].[ext]",
              limit: 4096 // 4kb
            }
          }
        ]
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
