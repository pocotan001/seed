import rimraf from "rimraf";
import { promisify } from "util";
import webpack from "webpack";
import log from "../lib/logger";
import createClientConfig from "../webpack/ClientConfig";
import createServerConfig from "../webpack/ServerConfig";
import { Script } from "./Script";

const remove = promisify(rimraf);
const statsOption: webpack.Options.Stats = {
  colors: true,
  errors: true,
  warnings: true,
  builtAt: false,
  hash: false,
  timings: false,
  version: false,
  entrypoints: false,
  modules: false
};

const build: Script = async config => {
  const clientConfig = createClientConfig(config);
  const serverConfig = createServerConfig(config);
  const compiler = webpack([clientConfig, serverConfig]);
  const compile = promisify<webpack.Stats>(compiler.run.bind(compiler));

  await remove(config.paths.dist);
  const stats = await compile();

  log.info(`${stats.toString(statsOption)}\n`);
};

export default build;
