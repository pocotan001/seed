import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import config from "~/config";
import catcher from "./middleware/catcher";
import render from "./middleware/render";
import * as security from "./middleware/security";
import session from "./middleware/session";
import routes, { api } from "./routes";

const app = express();

// http://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", Number(process.env.TRUST_PROXY) || "loopback");

app.use(
  bodyParser.json({
    type: [
      "json",
      "application/csp-report",
      "application/expect-ct-report+json"
    ]
  })
);

if (config.isDev) {
  // tslint:disable-next-line:no-var-requires
  app.use(require("./middleware/logger").default());
}

app.use(security.nonce(), security.headers());
app.use(express.static(path.join(__dirname, "public")));
app.use(session());
app.use("/api", api);
app.use(routes);
app.use(render());
app.use(catcher());

export default app;
