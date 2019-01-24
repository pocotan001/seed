import express from "express";
import { Middleware } from "./Middleware";

const createServeStaticMiddleware = (publicPath: string): Middleware =>
  express.static(publicPath, { index: false });

export default createServeStaticMiddleware;
