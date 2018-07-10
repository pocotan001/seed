import { ErrorRequestHandler } from "express-serve-static-core";
import { STATUS_CODES } from "http";
import * as React from "react";
import * as ReactDOM from "react-dom/server";
import Head from "~/components/modules/Head";
import createLogger from "~/infrastructure/logger";

const log = createLogger("[catcher]");

const catcher = (): ErrorRequestHandler => (err: Error, _, res, __) => {
  if ([401, 403].includes(err.status)) {
    res.redirect(302, "/");
    return;
  }

  err.status = err.status || 500;
  log.error(err.stack);

  // TODO
  const html = ReactDOM.renderToStaticMarkup(
    <html>
      <Head
        title={STATUS_CODES[err.status] || STATUS_CODES[500]!}
        meta={[{ name: "robots", content: "noindex,nofollow" }]}
      />
      <body>
        <p>
          {err.status} {err.message}
        </p>
      </body>
    </html>
  );

  res.status(err.status).send(`<!DOCTYPE html>${html}`);
};

export default catcher;
