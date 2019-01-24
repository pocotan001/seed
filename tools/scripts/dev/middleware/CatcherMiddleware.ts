import log from "../../../lib/logger";
import { CatcherMiddleware } from "./Middleware";

const createCatcherMiddleware = (): CatcherMiddleware => (
  err: Error,
  _,
  __,
  ___
) => {
  log.fail(err.stack || err.message);
};

export default createCatcherMiddleware;
