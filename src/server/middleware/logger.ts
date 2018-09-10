import chalk from "chalk";
import { Request, RequestHandler } from "express-serve-static-core";
import morgan from "morgan";
import { isNumeric } from "~/domain/Validator";
import createLogger from "~/infra/logger";

const log = createLogger("[app]");

const validateStatus = (status: number): boolean =>
  status >= 200 && status < 400;

const formatStatus = (status: string = "-"): string => {
  if (isNumeric(status) && !validateStatus(Number(status))) {
    return chalk.red(status);
  }

  return chalk.yellow(status);
};

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
        formatStatus(tokens.status(req, res)),
        tokens.method(req, res),
        getUrl(req)
      ].join(" "),
    {
      stream: new OutputStream()
    }
  );

export default logger;
