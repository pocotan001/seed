import { RequestHandler } from "express-serve-static-core";
import * as helmet from "helmet";
import config from "~/config";

const headers = (): RequestHandler =>
  helmet({
    // https://helmetjs.github.io/docs/csp/
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "storage.googleapis.com",
          (_, res) => `'nonce-${res.locals.nonce}'`
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "placekitten.com"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'none'"],
        blockAllMixedContent: config.isProd,
        reportUri: "/csp-report"
      }
    },

    // https://helmetjs.github.io/docs/referrer-policy/
    referrerPolicy: { policy: "origin" }
  });

export default headers;
