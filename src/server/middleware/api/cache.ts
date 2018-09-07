import { Request, RequestHandler } from "express-serve-static-core";
import LRU from "lru-cache";
import config from "~/config";
import createLogger from "~/infra/logger";

const CACHEABLE_METHODS = ["GET", "HEAD", "OPTIONS"];
const log = createLogger("[api]");
const lruCache: LRU.Cache<string, string> = new LRU(100);

const getUrl = (req: Request): string =>
  req.hostname === "null" // From my own API
    ? req.originalUrl.split("//null").pop()!
    : req.originalUrl;

const isCacheable = (req: Request): boolean =>
  config.isProd && CACHEABLE_METHODS.includes(req.method);

/**
 * API response caching
 *
 * @example
 * // Cache a route
 * api.get("/article/:id?", cache(10), getArticle);
 * // Cache all routes
 * api.use(cache(10));
 */
const cache = (maxAgeSeconds: number): RequestHandler => (req, res, next) => {
  if (!isCacheable(req)) {
    return next();
  }

  const url = getUrl(req);

  if (lruCache.has(url)) {
    log.info("Cache hit: %o", url);
    res.type("json").send(lruCache.get(url));
    return;
  }

  const origSend = res.send;

  res.send = body => {
    if (res.statusCode === 200) {
      const isCached = lruCache.set(url, body, maxAgeSeconds * 1000);

      if (isCached) {
        log.info("Cached: %o", url);
      }
    }

    return origSend.call(res, body);
  };

  next();
};

export default cache;
