import chalk from "chalk";

export const log = {
  info: (message: string) => process.stdout.write(`${message}\n`),
  wait: (message: string) =>
    process.stdout.write(`${chalk.black.bgBlue(" WAIT ")} ${message}\n`),
  done: (message: string) =>
    process.stdout.write(`${chalk.black.bgGreen(" DONE ")} ${message}\n`),
  warn: (message: string) =>
    process.stderr.write(`${chalk.black.bgYellow(" WARN ")} ${message}\n`),
  error: (message: string) =>
    process.stderr.write(`${chalk.black.bgRed(" ERROR ")} ${message}\n`),
  clear: () => process.stdout.write("\x1Bc")
};
