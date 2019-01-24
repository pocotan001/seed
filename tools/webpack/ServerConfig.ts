import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { Config } from "../Config";
import createBaseConfig from "./BaseConfig";

const createServerConfig = (config: Config): webpack.Configuration => {
  const base = createBaseConfig(config);
  const { paths } = config;
  const { isDebug } = config.webpack;

  const envs: NodeJS.ProcessEnv = {
    ENV: process.env.ENV,
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    CONSOLA_LEVEL: process.env.CONSOLA_LEVEL
  };

  return {
    ...base,
    name: "Server",
    target: "node",
    devtool: isDebug ? "inline-cheap-module-source-map" : "source-map",
    entry: [
      "source-map-support/register",
      "./tools/env.ts",
      "./src/server/main.ts"
    ],
    output: {
      path: paths.dist,
      filename: "server.js",
      chunkFilename: "chunks/[name].js",
      publicPath: "/",
      libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    plugins: [...base.plugins!, new webpack.EnvironmentPlugin(envs)],
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
};

export default createServerConfig;
