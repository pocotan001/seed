import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as api from "./middleware/api";
import catcher from "./middleware/catcher";
import logger from "./middleware/logger";
import render from "./middleware/render";
import * as security from "./middleware/security";
import session from "./middleware/session";
import routes from "./routes";
import apiRoutes from "./routes/api";

const app = express();

// http://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", Number(process.env.TRUST_PROXY) || "loopback");

app.use(logger());

app.use(
  bodyParser.json({
    type: ["json", "application/csp-report"]
  })
);

app.use(security.nonce(), security.headers());
app.use(express.static(path.join(__dirname, "public")));
app.use(session());

app.use(
  "/api",
  api.csrf(),
  api.cache(),
  api.context(),
  apiRoutes,
  api.catcher()
);

app.use(routes);
app.use(render());
app.use(catcher());

export default app;
