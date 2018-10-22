import { ErrorRequestHandler } from "express-serve-static-core";
import createLogger from "~/infra/logger";

const log = createLogger("[fatal]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, next) => {
  log.error(err.stack);
  res.end();
  next(err);
};

export default catcher;
