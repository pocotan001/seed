import { RequestHandler } from "express-serve-static-core";
import createLogger from "~/infrastructure/logger";

const log = createLogger("[security]");

const ctReport: RequestHandler = (req, res) => {
  log.error("CT violation: %o", req.body);
  res.status(204).end();
};

export default ctReport;
