import chalk from "chalk";
import debug from "debug";
import config from "~/config";

type LogType = "error" | "warn" | "info" | "debug";
type Log = (formatter?: any, ...args: any[]) => void;

interface LogConfig {
  level: number;
  fn: keyof Console;
  icon?: string; // server only
}

enum LogLevel {
  Silent = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4
}

type LogLevelKey = keyof typeof LogLevel;

const FORBIDDEN = config.isProd && config.isClient;

const Types: Record<LogType, LogConfig> = {
  error: {
    level: LogLevel.Error,
    fn: "error",
    icon: chalk.red("✖")
  },
  warn: {
    level: LogLevel.Warn,
    fn: "warn",
    icon: chalk.yellow("⚠")
  },
  info: {
    level: LogLevel.Info,
    fn: "info"
  },
  debug: {
    level: LogLevel.Debug,
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

export class Logger implements Record<LogType, Log> {
  static level = LogLevel[config.logLevel as LogLevelKey];

  namespace: string;
  error: Log;
  warn: Log;
  info: Log;
  debug: Log;

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

  private createLog({ level, icon, fn }: LogConfig): Log {
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
