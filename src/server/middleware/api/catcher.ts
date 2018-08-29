import { ErrorRequestHandler } from "express-serve-static-core";
import { pick } from "lodash";
import { normalizeError } from "~/domain/Error";
import createLogger from "~/infra/logger";

interface IApiErrorResponse {
  error: Pick<Error, "message" | "code" | "data">;
}

const log = createLogger("[api]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, __) => {
  log.error(err.stack);
  err = normalizeError(err);

  const resp: IApiErrorResponse = {
    error: pick(err, ["message", "code", "data"])
  };

  res.status(err.status!).json(resp);
};

export default catcher;
