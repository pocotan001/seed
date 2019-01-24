import webpackHotMiddleware from "webpack-hot-middleware";
import { ClientCompiler } from "../ClientCompiler";
import { Middleware } from "./Middleware";

const createWebpackHotMiddleware = (
  clientCompiler: ClientCompiler
): Middleware => webpackHotMiddleware(clientCompiler.compiler, { log: false });

export default createWebpackHotMiddleware;
