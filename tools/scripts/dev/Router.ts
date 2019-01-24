import express from "express";
import { ClientCompiler } from "./ClientCompiler";
import createApplicationProxyMiddleware from "./middleware/ApplicationProxyMiddleware";
import createCatcherMiddleware from "./middleware/CatcherMiddleware";
import createLoggerMiddleware from "./middleware/LoggerMiddleware";
import createWebpackDevMiddleware from "./middleware/WebpackDevMiddleware";
import createWebpackHotMiddleware from "./middleware/WebpackHotMiddleware";

export type Router = express.Router;

const createRouter = (clientCompiler: ClientCompiler): Router => {
  const router = express.Router();

  router.use(createLoggerMiddleware());
  router.use(createWebpackDevMiddleware(clientCompiler));
  router.use(createWebpackHotMiddleware(clientCompiler));
  router.use(createApplicationProxyMiddleware());
  router.use(createCatcherMiddleware());

  return router;
};

export default createRouter;
