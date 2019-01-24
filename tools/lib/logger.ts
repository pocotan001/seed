import chalk from "chalk";

export interface Logger {
  info: (message: string) => void;
  wait: (message: string) => void;
  done: (message: string) => void;
  warn: (message: string) => void;
  fail: (message: string) => void;
  clear: () => void;
}

type Tags = Partial<Record<keyof Logger, string>>;

const tags: Tags = {
  wait: chalk.black.bgBlue(" WAIT "),
  done: chalk.black.bgGreen(" DONE "),
  warn: chalk.black.bgYellow(" WARN "),
  fail: chalk.black.bgRed(" FAIL ")
};

// tslint:disable:no-console
const logger: Logger = {
  info: console.log.bind(console),
  wait: console.log.bind(console, tags.wait),
  done: console.log.bind(console, tags.done),
  warn: console.log.bind(console, tags.warn),
  fail: console.log.bind(console, tags.fail),
  clear: console.clear.bind(console)
};
// tslint:enable:no-console

export default logger;
