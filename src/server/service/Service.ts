import { Request } from "~/infra/request";

export interface ServiceContext {
  request: Request;
}

export default class Service {
  protected ctx: ServiceContext;

  constructor(ctx: ServiceContext) {
    this.ctx = ctx;
  }
}
