import { Application } from "express";
import { Middleware } from "./Middleware";

const createApplicationProxyMiddleware = (): Middleware => (req, res, next) => {
  try {
    // Include app routes as a middleware
    const app: Application = require("../../../../dist/server").default;

    app(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default createApplicationProxyMiddleware;
