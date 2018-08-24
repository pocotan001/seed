import * as fs from "fs-extra";
import { promisify } from "util";
import * as webpack from "webpack";
import { DIST_DIR, ROOT_DIR } from "../config/paths";
import clientConfig from "../config/webpack/webpack.config.client";
import serverConfig from "../config/webpack/webpack.config.server";
import * as log from "../logger";

const compiler = webpack([clientConfig, serverConfig]);
const compile = promisify<webpack.Stats>(compiler.run.bind(compiler));
const statsOpts = clientConfig.stats;

const build = async () => {
  await fs.remove(DIST_DIR);

  const [stats] = await Promise.all([
    compile(),
    fs.copy(`${ROOT_DIR}/static`, `${DIST_DIR}/public`)
  ]);

  log.info(`${stats.toString(statsOpts)}\n`);
};

export default build;
