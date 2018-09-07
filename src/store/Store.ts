import { History } from "history";
import { Request } from "~/infra/request";
import { State } from "./state";

export interface StoreContext {
  history: History;
  api: Request;
}

export default class Store {
  protected state: State;
  protected ctx: StoreContext;

  constructor(state: State, ctx: StoreContext) {
    this.state = state;
    this.ctx = ctx;
  }
}
