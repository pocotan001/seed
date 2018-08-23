import { RequestHandler } from "express-serve-static-core";
import createRequest from "~/infra/request";
import createService from "~/server/service";

const request = createRequest();

const service = (): RequestHandler => (req, _, next) => {
  req.service = createService({ request });
  next();
};

export default service;
