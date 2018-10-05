import { ErrorReporting } from "@google-cloud/error-reporting";
import { ErrorRequestHandler } from "express-serve-static-core";

const errors = new ErrorReporting();
const errorReporting = (): ErrorRequestHandler => errors.express;

export default errorReporting;
