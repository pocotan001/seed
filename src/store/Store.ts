import { History } from "history";
import { Request } from "~/infra/request";
import { State } from "./state";

export interface IStoreContext {
  history: History;
  api: Request;
}

export default class Store {
  protected state: State;
  protected ctx: IStoreContext;

  constructor(state: State, ctx: IStoreContext) {
    this.state = state;
    this.ctx = ctx;
  }
}
