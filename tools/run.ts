import "@babel/polyfill";
import "./env";

import chalk from "chalk";
import * as debug from "debug";
import log from "./logger";

const { humanize } = debug as any;

(async () => {
  try {
    const [, , script] = process.argv;
    const start = Date.now();

    log.wait(
      `${script} starting... ${chalk.green(`(${process.env.NODE_ENV})`)}\n`
    );

    // tslint:disable-next-line:non-literal-require
    await require(`./scripts/${script}`).default();

    const end = Date.now();
    const time = chalk.green(`+${humanize(end - start)}`);

    log.done(`${script} finished ${time}\n`);
  } catch (err) {
    log.error(err.stack);
    process.exit(1);
  }
})();
