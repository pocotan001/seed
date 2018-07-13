import * as express from "express";
import cspReport from "./cspReport";
import ctReport from "./ctReport";

const router = express.Router();

router.post("/csp-report", cspReport);
router.post("/ct-report", ctReport);

export default router;
