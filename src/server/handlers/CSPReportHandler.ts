import consola from "consola";
import { Handler } from "./Handler";

const createCSPReportHandler = (): Handler => (req, res) => {
  consola.error(`CSP violation: ${JSON.stringify(req.body)}`);
  res.status(204).end();
};

export default createCSPReportHandler;
