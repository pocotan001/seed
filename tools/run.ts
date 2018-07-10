import "@babel/polyfill";
import "./env";

import chalk from "chalk";
import * as debug from "debug";
import { SCRIPTS_DIR } from "./config/paths";
import { log } from "./utils";

const { humanize } = debug as any;

(async () => {
  try {
    const [, , script] = process.argv;
    const start = Date.now();

    log.wait(`${script} starting...\n`);
    await require(`${SCRIPTS_DIR}/${script}`).default();

    const end = Date.now();
    const time = chalk.green(`+${humanize(end - start)}`);

    log.done(`${script} finished ${time}\n`);
  } catch (err) {
    log.error(err.stack);
    process.exit(1);
  }
})();
