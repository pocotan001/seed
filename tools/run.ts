import "./env";

import chalk from "chalk";
import debug from "debug";
import * as log from "./logger";

const { humanize } = debug as any;

(async () => {
  try {
    const env = chalk.green(`(${process.env.ENV})`);
    const [, , script] = process.argv;
    const start = Date.now();

    log.wait(`${env} ${script} starting...\n`);

    // tslint:disable-next-line:non-literal-require
    await require(`./scripts/${script}`).default();

    const end = Date.now();
    const time = chalk.green(`+${humanize(end - start)}`);

    log.done(`${env} ${script} finished ${time}\n`);
  } catch (err) {
    log.error(err.stack);
    process.exit(1);
  }
})();
