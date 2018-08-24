import chalk from "chalk";

export const info = (message: string) => process.stdout.write(`${message}\n`);

export const wait = (message: string) =>
  process.stdout.write(`${chalk.black.bgBlue(" WAIT ")} ${message}\n`);

export const done = (message: string) =>
  process.stdout.write(`${chalk.black.bgGreen(" DONE ")} ${message}\n`);

export const warn = (message: string) =>
  process.stderr.write(`${chalk.black.bgYellow(" WARN ")} ${message}\n`);

export const error = (message: string) =>
  process.stderr.write(`${chalk.black.bgRed(" ERROR ")} ${message}\n`);

export const clear = () => process.stdout.write("\x1Bc");
