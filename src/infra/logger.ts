import chalk from "chalk";
import * as debug from "debug";
import config from "~/config";

type ILogType = "error" | "warn" | "info" | "debug";
type ILog = (formatter?: any, ...args: any[]) => void;
type ILogger = Record<ILogType, ILog>;

interface ILogConfig {
  level: number;
  fn: keyof Console;
  icon?: string; // server only
}

export enum LogLevel {
  SILENT = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4
}

type ILogLevelKey = keyof typeof LogLevel;

const FORBIDDEN = config.isProd && config.isClient;

const Types: Record<ILogType, ILogConfig> = {
  error: {
    level: LogLevel.ERROR,
    fn: "error",
    icon: chalk.red("✖")
  },
  warn: {
    level: LogLevel.WARN,
    fn: "warn",
    icon: chalk.yellow("⚠")
  },
  info: {
    level: LogLevel.INFO,
    fn: "info"
  },
  debug: {
    level: LogLevel.DEBUG,
    fn: config.isClient ? "debug" : "log"
  }
};

// HACK: Enabling namespaces which contain `[]` leads to unexpected results
//       escapeBrackets("[APP]") // "\[APP\]"
const reBrackets = /([\[\]])/g;
const escapeBrackets = (namespace: string) =>
  namespace.replace(reBrackets, "\\$1");

export const enables: Set<string> = new Set(
  process.env.DEBUG ? process.env.DEBUG.split(",") : []
);

export class Logger implements ILogger {
  static level = LogLevel[config.logLevel as ILogLevelKey];

  namespace: string;
  error: ILog;
  warn: ILog;
  info: ILog;
  debug: ILog;

  constructor(namespace: string) {
    this.namespace = namespace;

    this.error = this.createLog(Types.error);
    this.warn = this.createLog(Types.warn);
    this.info = this.createLog(Types.info);
    this.debug = this.createLog(Types.debug);

    if (FORBIDDEN) {
      this.disable();
    } else {
      this.enable();
    }
  }

  get isEnabled(): boolean {
    return debug.enabled(this.namespace);
  }

  enable() {
    enables.add(escapeBrackets(this.namespace));
    debug.enable(Array.from(enables).join(","));
  }

  disable() {
    enables.delete(escapeBrackets(this.namespace));
    debug.enable(Array.from(enables).join(","));
  }

  private createLog({ level, icon, fn }: ILogConfig): ILog {
    const log = debug(this.namespace);

    // Log via console.xxx
    // https://github.com/visionmedia/debug#output-streams
    log.log = console[fn].bind(console);

    return (formatter, ...args) => {
      if (!this.isEnabled || level > Logger.level) {
        return;
      }

      if (config.isServer && icon && (debug as any).useColors()) {
        if (typeof formatter === "string") {
          formatter = `${icon} ${formatter}`;
        } else {
          args.unshift(formatter);
          formatter = `${icon} %O`;
        }
      }

      log(formatter, ...args);
    };
  }
}

const cache: Map<string, Logger> = new Map();

const createLogger = (namespace: string): Logger => {
  if (!cache.has(namespace)) {
    cache.set(namespace, new Logger(namespace));
  }

  return cache.get(namespace)!;
};

export default createLogger;
