import express from "express";
import { Config } from "./Config";
import { Router } from "./Router";

export type Application = express.Application;

const createApplication = (config: Config, router: Router): Application => {
  const app = express();

  if (config.env.isProd) {
    app.set("trust proxy", 1);
  }

  app.use(router);

  return app;
};

export default createApplication;
