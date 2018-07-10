import { action, computed } from "mobx";
import { RootStore } from ".";
import Store, { IStoreContext } from "./Store";

interface ILoginParams {
  email: string;
  password: string;
}

export default class UserStore extends Store {
  constructor(root: RootStore, ctx: IStoreContext) {
    super(root, ctx);

    if (ctx.req && ctx.req.session.user) {
      this.state.entities.user = ctx.req.session.user;
    }
  }

  @computed
  get isLoggedIn(): boolean {
    return Boolean(this.state.entities.user);
  }

  @action
  async login(payload: ILoginParams): Promise<void> {
    const resp = await this.ctx.api.post("/login", payload);

    this.state.entities.user = resp.data.entities.user!;
  }

  @action
  async logout(): Promise<void> {
    await this.ctx.api.delete("/logout");
    this.state.entities.user = null;
  }
}
