import express, { RequestHandler } from "express";
import * as path from "path";

const serveStatic = (): RequestHandler =>
  express.static(path.join(__dirname, "public"));

export default serveStatic;
