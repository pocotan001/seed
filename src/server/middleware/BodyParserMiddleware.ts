import bodyParser from "body-parser";
import { Middleware } from "./Middleware";

const createBodyParserMiddleware = (): Middleware =>
  bodyParser.json({
    type: ["json", "application/csp-report"]
  });

export default createBodyParserMiddleware;
