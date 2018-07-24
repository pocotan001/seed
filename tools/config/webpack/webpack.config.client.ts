import { pick } from "lodash";
import * as webpack from "webpack";
import * as ManifestPlugin from "webpack-manifest-plugin";
import * as merge from "webpack-merge";
import { GenerateSW } from "workbox-webpack-plugin";
import * as pkg from "../../../package.json";
import { DIST_DIR } from "../paths";
import baseConfig, { isDebug } from "./webpack.config.base";

const ENV_EXPORTS = ["ENV", "NODE_ENV", "DEBUG", "LOG_LEVEL"];

const clientConfig = merge(baseConfig, {
  name: "Client",
  target: "web",
  entry: ["@babel/polyfill", "intersection-observer", "./src/client/index.tsx"],
  output: {
    path: `${DIST_DIR}/public`,
    filename: isDebug ? "main.js" : "main.[hash].js",
    chunkFilename: isDebug
      ? "chunks/[name].js"
      : "chunks/[name].[chunkhash].js",
    publicPath: "/"
  },
  plugins: [
    ...[
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
      })
    ],
    ...(isDebug
      ? []
      : [
          // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
          new GenerateSW({
            swDest: `${DIST_DIR}/public/sw.js`,
            cacheId: pkg.name,
            runtimeCaching: []
          })
        ])
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
});

export default clientConfig;
