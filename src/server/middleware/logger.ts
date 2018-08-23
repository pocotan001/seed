import chalk from "chalk";
import { Request, RequestHandler } from "express-serve-static-core";
import * as morgan from "morgan";
import createLogger from "~/infra/logger";

const log = createLogger("[app]");

const getUrl = (req: Request) =>
  req.hostname === "null" // From my own API
    ? req.originalUrl.split("//null").pop()!
    : req.originalUrl;

class OutputStream {
  write(message: string) {
    log.info(message.replace(/\n$/, ""));
  }
}

const logger = (): RequestHandler =>
  morgan(
    (tokens, req, res) =>
      [
        chalk.yellow(tokens.status(req, res) || "-"),
        tokens.method(req, res),
        getUrl(req)
      ].join(" "),
    {
      stream: new OutputStream()
    }
  );

export default logger;
