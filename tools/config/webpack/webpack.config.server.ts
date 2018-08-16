import { pick } from "lodash";
import * as webpack from "webpack";
import * as nodeExternals from "webpack-node-externals";
import { DIST_DIR } from "../paths";
import baseConfig, { isDebug } from "./webpack.config.base";

const NODE_VERSION = "8.0.0";
const ENV_EXPORTS = ["ENV"];

const serverConfig: webpack.Configuration = {
  ...baseConfig,
  name: "Server",
  target: "node",
  entry: [
    ...(isDebug ? ["source-map-support/register"] : []),
    ...["./tools/env.ts", "./src/server/index.ts"]
  ],
  output: {
    path: DIST_DIR,
    filename: "server.js",
    chunkFilename: "chunks/[name].js",
    publicPath: "/",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals(), "./chunk-manifest.json"],
  module: {
    ...baseConfig.module!,
    rules: baseConfig.module!.rules.map(rule => {
      if (rule.use) {
        return {
          ...rule,
          use: (rule.use as webpack.RuleSetLoader[]).map(useRule => {
            if (useRule.loader === "babel-loader") {
              return {
                ...useRule,
                options: {
                  ...(useRule as any).options,
                  presets: (useRule as any).options.presets.map(
                    (preset: any) => {
                      const [name, opts] = preset;

                      if (name === "@babel/preset-env") {
                        return [
                          name,
                          {
                            ...opts,
                            targets: {
                              node: NODE_VERSION
                            }
                          }
                        ];
                      }

                      return preset;
                    }
                  )
                }
              };
            }

            return useRule;
          })
        };
      }

      if (rule.loader === "url-loader") {
        return {
          ...rule,
          options: {
            ...(rule as any).options,
            // Disables `emitFile` option
            // https://github.com/webpack-contrib/file-loader#emitfile
            emitFile: false
          }
        };
      }

      return rule;
    })
  },
  plugins: [
    ...baseConfig.plugins!,
    new webpack.EnvironmentPlugin(pick(process.env, ENV_EXPORTS))
  ],
  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    setImmediate: false,
    Buffer: false
  }
};

export default serverConfig;
