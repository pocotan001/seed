import * as express from "express";
import cspReport from "./cspReport";
import ctReport from "./ctReport";

const routes = express.Router();

routes.post("/csp-report", cspReport);
routes.post("/ct-report", ctReport);

export { default as api } from "./api";
export default routes;
