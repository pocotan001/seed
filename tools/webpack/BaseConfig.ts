import HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import webpack from "webpack";
import { Config } from "../Config";

const createBaseConfig = (config: Config): webpack.Configuration => {
  const { isDebug } = config.webpack;

  return {
    mode: isDebug ? "development" : "production",
    bail: !isDebug,
    cache: isDebug,
    performance: {
      hints: false
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
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
                cacheDirectory: isDebug
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // https://github.com/mzgoddard/hard-source-webpack-plugin
      new HardSourceWebpackPlugin({
        info: { level: "error" }
      })
    ]
  };
};

export default createBaseConfig;
