import { RequestHandler } from "express-serve-static-core";
import createLogger from "~/infra/logger";

const log = createLogger("[security]");

const cspReport: RequestHandler = (req, res) => {
  log.error("CSP violation: %o", req.body);
  res.status(204).end();
};

export default cspReport;
