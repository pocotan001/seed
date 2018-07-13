import { RequestHandler } from "express-serve-static-core";
import * as helmet from "helmet";

const headers = (): RequestHandler =>
  helmet({
    // https://helmetjs.github.io/docs/csp/
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          "storage.googleapis.com",
          (_, res) => `'nonce-${res.locals.nonce}'`
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "placekitten.com"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        blockAllMixedContent: true,
        reportUri: "/csp-report"
      }
    },

    // https://helmetjs.github.io/docs/expect-ct/
    expectCt: {
      enforce: true,
      maxAge: 86400,
      reportUri: "/ct-report"
    },

    // https://helmetjs.github.io/docs/referrer-policy/
    referrerPolicy: { policy: "same-origin" }
  });

export default headers;
