import helmet from "helmet";
import { Middleware } from "./Middleware";

const createHeadersMiddleware = (reportOnly = false): Middleware =>
  helmet({
    // https://helmetjs.github.io/docs/csp/
    contentSecurityPolicy: {
      reportOnly,
      directives: {
        defaultSrc: ["'self'", "https:"],
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

export default createHeadersMiddleware;
