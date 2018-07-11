import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import config from "~/config";
import * as api from "./middleware/api";
import catcher from "./middleware/catcher";
import logger from "./middleware/logger";
import render from "./middleware/render";
import * as security from "./middleware/security";
import session from "./middleware/session";
import routes from "./routes";

const app = express();

// http://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", Number(process.env.TRUST_PROXY) || "loopback");

app.use(
  bodyParser.json({
    type: ["json", "application/csp-report"]
  })
);

app.use(logger());
app.use(security.nonce(), security.headers());
app.use(session());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  config.apiPath,
  api.csrf(),
  api.cache(),
  api.context(),
  api.routes(),
  api.catcher()
);

app.use(routes);
app.use(render());
app.use(catcher());

export default app;
