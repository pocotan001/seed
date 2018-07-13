import { RequestHandler } from "express-serve-static-core";
import config from "~/config";

const CACHEABLE_METHODS = ["GET", "HEAD"];

const cache = (): RequestHandler => (req, res, next) => {
  if (config.isProd && CACHEABLE_METHODS.includes(req.method)) {
    // https://cloud.google.com/appengine/docs/standard/nodejs/reference/request-response-headers#cache-control_expires_and_vary
    res.header("Cache-Control", "public, max-age=10");
  }

  next();
};

export default cache;
