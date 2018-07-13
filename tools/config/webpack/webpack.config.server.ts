import { pick } from "lodash";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as nodeExternals from "webpack-node-externals";
import { DIST_DIR } from "../paths";
import baseConfig from "./webpack.config.base";

const serverConfig = merge(baseConfig, {
  name: "Server",
  target: "node",
  entry: ["@babel/polyfill", "./src/server/index.ts"],
  output: {
    path: DIST_DIR,
    filename: "server.js",
    chunkFilename: "chunks/[name].js",
    publicPath: "/",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals(), "./chunk-manifest.json"],
  plugins: [
    new webpack.EnvironmentPlugin({
      ...pick(process.env, ["NODE_ENV", "DEBUG", "LOG_LEVEL"]),
      SERVER: "yes"
    })
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
});

export default serverConfig;
