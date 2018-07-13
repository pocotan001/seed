import { RequestHandler } from "express-serve-static-core";
import config from "~/config";

const FAKE_SECRET = "123, easy as ABC";

const session = (): RequestHandler =>
  require("cookie-session")({
    name: process.env.SESSION_NAME || "session",
    keys: [
      process.env.SESSION_SECRET_1 || FAKE_SECRET,
      process.env.SESSION_SECRET_2 || FAKE_SECRET,
      process.env.SESSION_SECRET_3 || FAKE_SECRET
    ],
    secure: !config.isLocal
  });

export default session;
