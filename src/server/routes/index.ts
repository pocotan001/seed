import * as express from "express";
import cspReport from "./cspReport";

const router = express.Router();

router.post("/csp-report", cspReport);

export default router;
