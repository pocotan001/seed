import * as express from "express-serve-static-core";
import { Request } from "~/infrastructure/request";
import { RootService } from ".";

export interface IServiceContext {
  req: express.Request;
  res: express.Response;
  request: Request;
}

export default class Service {
  protected service: RootService;
  protected ctx: IServiceContext;

  constructor(service: RootService, ctx: IServiceContext) {
    this.service = service;
    this.ctx = ctx;
  }
}
