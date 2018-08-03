import * as express from "express-serve-static-core";
import { History } from "history";
import { Request } from "~/infrastructure/request";
import { RootStore } from ".";

export interface IStoreContext {
  history: History;
  api: Request;
  req?: express.Request; // server only
  res?: express.Response; // server only
}

export default class Store {
  protected state: RootStore["state"];
  protected store: Omit<RootStore, "state">;
  protected ctx: IStoreContext;

  constructor({ state, ...store }: RootStore, ctx: IStoreContext) {
    this.state = state;
    this.store = store;
    this.ctx = ctx;
  }
}
