import "./env";

import chalk from "chalk";
import createConfig from "./Config";
import log from "./lib/logger";
import prettyTime from "./lib/prettyTime";
import { Script } from "./scripts/Script";

(async () => {
  try {
    const config = createConfig();
    const env = chalk.green(`(${config.env.name})`);
    const [, , name] = process.argv;
    // tslint:disable-next-line:non-literal-require
    const script: Script = require(`./scripts/${name}`).default;
    const start = Date.now();

    log.wait(`${env} ${name} starting...\n`);
    await script(config);

    const end = Date.now();
    const diff = chalk.green(`+${prettyTime(end - start)}`);

    log.done(`${env} ${name} finished ${diff}\n`);
  } catch (err) {
    log.fail(err.stack || err.message);
    process.exit(1);
  }
})();
