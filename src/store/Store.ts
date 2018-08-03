import * as express from "express-serve-static-core";
import { History } from "history";
import { Request } from "~/infrastructure/request";
import { State } from "./state";

export interface IStoreContext {
  history: History;
  api: Request;
  req?: express.Request; // server only
  res?: express.Response; // server only
}

export default class Store {
  protected state: State;
  protected ctx: IStoreContext;

  constructor(state: State, ctx: IStoreContext) {
    this.state = state;
    this.ctx = ctx;
  }
}
