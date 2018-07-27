import { RequestHandler } from "express-serve-static-core";
import * as helmet from "helmet";

const headers = (): RequestHandler =>
  helmet({
    // https://helmetjs.github.io/docs/csp/
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https:"],
        scriptSrc: [
          "'self'",
          "https:",
          (_, res) => `'nonce-${res.locals.nonce}'`
        ],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        imgSrc: ["'self'", "https:", "data:"],
        reportUri: "/csp-report",
        blockAllMixedContent: true
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
