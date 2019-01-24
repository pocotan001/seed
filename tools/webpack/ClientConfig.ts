import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { GenerateSW } from "workbox-webpack-plugin";
import pkg from "../../package.json";
import { Config } from "../Config";
import createBaseConfig from "./BaseConfig";

const createClientConfig = (config: Config): webpack.Configuration => {
  const base = createBaseConfig(config);
  const { paths } = config;
  const { isDebug, isAnalyze } = config.webpack;

  const envs: NodeJS.ProcessEnv = {
    ENV: process.env.ENV,
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    CONSOLA_LEVEL: process.env.CONSOLA_LEVEL
  };

  return {
    ...base,
    name: "Client",
    target: "web",
    devtool: isDebug ? "inline-cheap-module-source-map" : false,
    entry: ["./src/client/main.tsx"],
    output: {
      path: paths.public,
      filename: isDebug || isAnalyze ? "main.js" : "[hash].js",
      chunkFilename:
        isDebug || isAnalyze ? "chunks/[name].js" : "[chunkhash].js",
      publicPath: "/"
    },
    plugins: [
      ...base.plugins!,
      new webpack.EnvironmentPlugin(envs),
      // https://github.com/webpack-contrib/copy-webpack-plugin
      new CopyWebpackPlugin([
        {
          from: paths.static,
          to: paths.public,
          ignore: [".*"] // dot files
        }
      ]),
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: `${paths.src}/assets/index.html`
      }),
      ...(isDebug
        ? []
        : [
            // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
            new GenerateSW({
              swDest: `${paths.public}/sw.js`,
              cacheId: pkg.name,
              skipWaiting: true,
              clientsClaim: true,
              runtimeCaching: [
                // cache all Google Fonts requests
                {
                  urlPattern: new RegExp(
                    "^https://fonts.(?:googleapis|gstatic).com/"
                  ),
                  handler: "cacheFirst",
                  options: {
                    cacheName: "google-fonts",
                    expiration: {
                      maxEntries: 20
                    },
                    cacheableResponse: {
                      statuses: [0, 200]
                    }
                  }
                }
              ]
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
            name: "vendor",
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  };
};

export default createClientConfig;
