import * as express from "express";
import cspReport from "./cspReport";

const routes = express.Router();

routes.post("/csp-report", cspReport);

export default routes;
