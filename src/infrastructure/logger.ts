import chalk from "chalk";
import * as debug from "debug";
import config from "~/config";

type ILogType = "error" | "warn" | "info" | "debug" | "trace";
type ILog = (formatter?: any, ...args: any[]) => void;
type ILogger = Record<ILogType, ILog>;

interface ILoggerOptions {
  level?: ILogLevelKey;
}

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
  DEBUG = 4,
  TRACE = 5
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
    fn: "log"
  },
  trace: {
    level: LogLevel.TRACE,
    fn: "trace"
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
  namespace: string;
  level: LogLevel;

  error: ILog;
  warn: ILog;
  info: ILog;
  debug: ILog;
  trace: ILog;

  constructor(namespace: string, opts: ILoggerOptions = {}) {
    this.namespace = namespace;
    this.level = LogLevel[opts.level || (config.logLevel as ILogLevelKey)];

    this.error = this.createLog(Types.error);
    this.warn = this.createLog(Types.warn);
    this.info = this.createLog(Types.info);
    this.debug = this.createLog(Types.debug);
    this.trace = this.createLog(Types.trace);

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
      if (!this.isEnabled || level > this.level) {
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

const createLogger = (namespace: string, opts?: ILoggerOptions): Logger => {
  const logger = cache.get(namespace) || new Logger(namespace, opts);

  if (cache.has(namespace)) {
    // update options
    if (opts && opts.level) {
      logger.level = LogLevel[opts.level];
    }
  } else {
    cache.set(namespace, logger);
  }

  return logger;
};

export default createLogger;
