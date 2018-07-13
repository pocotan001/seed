import "@babel/polyfill";
import "./env";

import chalk from "chalk";
import * as debug from "debug";
import { SCRIPTS_DIR } from "./config/paths";
import logger from "./logger";

const { humanize } = debug as any;

(async () => {
  try {
    const [, , script] = process.argv;
    const start = Date.now();

    logger.wait(
      `${script} starting with env ${chalk.green(`"${process.env.ENV}"`)}\n`
    );
    await require(`${SCRIPTS_DIR}/${script}`).default();

    const end = Date.now();
    const time = chalk.green(`+${humanize(end - start)}`);

    logger.done(`${script} finished ${time}\n`);
  } catch (err) {
    logger.error(err.stack);
    process.exit(1);
  }
})();
