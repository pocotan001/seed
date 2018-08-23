import { Request } from "~/infra/request";

export interface IServiceContext {
  request: Request;
}

export default class Service {
  protected ctx: IServiceContext;

  constructor(ctx: IServiceContext) {
    this.ctx = ctx;
  }
}
