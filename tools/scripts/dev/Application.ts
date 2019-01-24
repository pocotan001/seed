import express from "express";
import { Router } from "./Router";

export type Application = express.Application;

const createApplication = (router: Router): Application => {
  const app = express();

  app.use(router);

  return app;
};

export default createApplication;
