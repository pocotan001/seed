import { ErrorRequestHandler } from "express-serve-static-core";
import createLogger from "~/infra/logger";

const log = createLogger("[fatal]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, __) => {
  log.error(err.stack);
  res.end();
};

export default catcher;
