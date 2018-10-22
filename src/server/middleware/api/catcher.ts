import { ErrorRequestHandler } from "express-serve-static-core";
import { pick } from "lodash";
import { normalizeError } from "~/domain/Error";
import createLogger from "~/infra/logger";

interface ApiErrorResponse {
  error: Pick<Error, "message" | "code" | "data">;
}

const log = createLogger("[api]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, next) => {
  log.error(err.stack);
  err = normalizeError(err);

  const resp: ApiErrorResponse = {
    error: pick(err, ["message", "code", "data"])
  };

  res.status(err.status || 500).json(resp);
  next(err);
};

export default catcher;
