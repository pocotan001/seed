import { RequestHandler } from "express-serve-static-core";

const IGNORE_METHODS = ["GET", "HEAD", "OPTIONS"];

const csrf = (): RequestHandler => (req, _, next) => {
  if (!req.xhr || !IGNORE_METHODS.includes(req.method)) {
    const err = new Error("CSRF validation failed");
    err.status = 403;

    return next(err);
  }

  next();
};

export default csrf;
