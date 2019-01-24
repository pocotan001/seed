import consola from "consola";
import express from "express";
import { Config } from "./Config";
import createCSPReportHandler from "./handlers/CSPReportHandler";
import createAPIMockMiddleware from "./middleware/APIMockMiddleware";
import createBodyParserMiddleware from "./middleware/BodyParserMiddleware";
import createBotProxyMiddleware from "./middleware/BotProxyMiddleware";
import createCatcherMiddleware from "./middleware/CatcherMiddleware";
import createHeadersMiddleware from "./middleware/HeadersMiddleware";
import createRenderMiddleware from "./middleware/RenderMiddleware";
import createServeStaticMiddleware from "./middleware/ServeStaticMiddleware";

export type Router = express.Router;

const createRouter = (config: Config): Router => {
  const { headers, botProxy } = config.middleware;
  const router = express.Router();

  router.use(createBodyParserMiddleware());
  router.use(createHeadersMiddleware(headers.reportOnly));
  router.use(createServeStaticMiddleware(config.paths.public));

  router.post("/csp-report", createCSPReportHandler());

  if (botProxy.proxyURL) {
    consola.info(`Proxying bots to ${botProxy.proxyURL}`);
    router.use(createBotProxyMiddleware(botProxy.proxyURL));
  }

  // TODO
  router.use("/api", createAPIMockMiddleware());

  router.use(createRenderMiddleware(config.paths.public));
  router.use(createCatcherMiddleware());

  return router;
};

export default createRouter;
