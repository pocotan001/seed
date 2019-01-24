import express from "express";
import { Middleware } from "../Middleware";

const createAPIMockMiddleware = (): Middleware => {
  const router = express.Router();

  router.post("/login", (_, res) => res.json(require("./mock/login").default));
  router.post("/logout", (_, res) => res.json({}));

  return router;
};

export default createAPIMockMiddleware;
