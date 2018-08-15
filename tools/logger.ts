import chalk from "chalk";

const info = (message: string) => process.stdout.write(`${message}\n`);

const wait = (message: string) =>
  process.stdout.write(`${chalk.black.bgBlue(" WAIT ")} ${message}\n`);

const done = (message: string) =>
  process.stdout.write(`${chalk.black.bgGreen(" DONE ")} ${message}\n`);

const warn = (message: string) =>
  process.stderr.write(`${chalk.black.bgYellow(" WARN ")} ${message}\n`);

const error = (message: string) =>
  process.stderr.write(`${chalk.black.bgRed(" ERROR ")} ${message}\n`);

const clear = () => process.stdout.write("\x1Bc");

export default { info, wait, done, warn, error, clear };
