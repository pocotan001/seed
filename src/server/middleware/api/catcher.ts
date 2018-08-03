import { ErrorRequestHandler } from "express-serve-static-core";
import { pick } from "lodash";
import { normalizeError } from "~/infrastructure/error";
import createLogger from "~/infrastructure/logger";

interface IApiErrorResponse {
  error: Pick<Error, "message" | "code" | "data">;
}

const log = createLogger("[api]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, __) => {
  err = normalizeError(err);

  const resp: IApiErrorResponse = {
    error: pick(err, ["message", "code", "data"])
  };

  log.error(err.stack);
  res.status(err.status!).json(resp);
};

export default catcher;
