import consola from "consola";
import { CatcherMiddleware } from "./Middleware";

const createCatcherMiddleware = (): CatcherMiddleware => (
  err: Error,
  _,
  res,
  next
) => {
  consola.fatal(err.stack || err.message);
  res.end();
  next(err);
};

export default createCatcherMiddleware;
