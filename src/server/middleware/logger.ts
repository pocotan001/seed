import chalk from "chalk";
import { Request, RequestHandler } from "express-serve-static-core";
import * as morgan from "morgan";
import createLogger from "~/infrastructure/logger";

const log = createLogger("[app]");
const isProxy = (req: Request) => req.hostname === "null";
const getUrlToken = (req: Request) =>
  isProxy(req) ? req.originalUrl.split("//null").pop() : req.originalUrl;

class OutputStream {
  write(message: string) {
    log.debug(message.replace(/\n$/, ""));
  }
}

const logger = (): RequestHandler =>
  morgan(
    (tokens, req, res) =>
      [
        chalk.yellow(tokens.status(req, res) || "-"),
        tokens.method(req, res),
        getUrlToken(req)
      ].join(" "),
    {
      stream: new OutputStream()
    }
  );

export default logger;
