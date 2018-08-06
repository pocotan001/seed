import { RequestHandler } from "express-serve-static-core";
import createRequest from "~/infra/request";
import createService from "~/server/service";

const context = (): RequestHandler => (req, res, next) => {
  const request = createRequest();

  req.ctx = req.ctx || {};
  req.ctx.service = createService({ req, res, request });
  next();
};

export default context;
