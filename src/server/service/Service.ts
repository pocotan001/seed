import * as express from "express-serve-static-core";
import { Request } from "~/infrastructure/request";

export interface IServiceContext {
  req: express.Request;
  res: express.Response;
  request: Request;
}

export default class Service {
  protected ctx: IServiceContext;

  constructor(ctx: IServiceContext) {
    this.ctx = ctx;
  }
}
