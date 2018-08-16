import { pick } from "lodash";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as ManifestPlugin from "webpack-manifest-plugin";
import { GenerateSW } from "workbox-webpack-plugin";
import * as pkg from "../../../package.json";
import { DIST_DIR } from "../paths";
import baseConfig, { isDebug } from "./webpack.config.base";

const ENV_EXPORTS = ["ENV", "NODE_ENV", "DEBUG", "LOG_LEVEL"];
const isAnalyze = process.env.ANALYZE === "on";

const clientConfig: webpack.Configuration = {
  ...baseConfig,
  name: "Client",
  target: "web",
  entry: ["intersection-observer", "./src/client/index.tsx"],
  output: {
    path: `${DIST_DIR}/public`,
    filename: isDebug || isAnalyze ? "main.js" : "[hash].js",
    chunkFilename: isDebug || isAnalyze ? "chunks/[name].js" : "[chunkhash].js",
    publicPath: "/"
  },
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
                              browsers: pkg.browserslist
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

      return rule;
    })
  },
  plugins: [
    ...baseConfig.plugins!,
    new webpack.EnvironmentPlugin({
      ...pick(process.env, ENV_EXPORTS),
      CLIENT: "yes"
    }),
    // https://github.com/danethurber/webpack-manifest-plugin
    new ManifestPlugin({
      ...{
        fileName: `${DIST_DIR}/chunk-manifest.json`,
        filter: file => file.isChunk,
        map: file => {
          if (file.name) {
            file.name = file.name.replace(/\.js$/, "");
          }

          return file;
        }
      },
      ...({
        serialize: (chunks: any) =>
          JSON.stringify(chunks, null, isDebug ? 2 : 0)
      } as any)
    }),
    ...(isDebug
      ? []
      : [
          // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
          new GenerateSW({
            swDest: `${DIST_DIR}/public/sw.js`,
            cacheId: pkg.name,
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: []
          })
        ]),
    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        }
      }
    }
  }
};

export default clientConfig;
