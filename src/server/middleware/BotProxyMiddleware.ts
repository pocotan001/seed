import rendertron from "rendertron-middleware";
import { Middleware } from "./Middleware";

const createBotProxyMiddleware = (proxyURL: string): Middleware =>
  rendertron.makeMiddleware({
    proxyUrl: proxyURL
  });

export default createBotProxyMiddleware;
