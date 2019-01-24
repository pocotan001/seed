import webpackDevMiddleware from "webpack-dev-middleware";
import { ClientCompiler } from "../ClientCompiler";
import { Middleware } from "./Middleware";

const createWebpackDevMiddleware = (
  clientCompiler: ClientCompiler
): Middleware =>
  webpackDevMiddleware(clientCompiler.compiler, {
    publicPath: "/",
    logLevel: "silent",
    index: false,
    writeToDisk: filename => filename.endsWith(".html")
  });

export default createWebpackDevMiddleware;
