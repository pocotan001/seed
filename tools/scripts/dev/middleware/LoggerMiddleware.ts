import chalk from "chalk";
import consola from "consola";
import morgan from "morgan";
import { Middleware } from "./Middleware";

const format: morgan.FormatFn = (tokens, req, res) =>
  [
    chalk.yellow(tokens.status(req, res)),
    tokens.method(req, res),
    tokens.url(req, res)
  ].join(" ");

const createLoggerMiddleware = (): Middleware =>
  morgan(format, {
    stream: {
      write(message: string) {
        consola.log(message.slice(0, -1));
      }
    }
  });

export default createLoggerMiddleware;
