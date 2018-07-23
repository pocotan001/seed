import { action, computed } from "mobx";
import { RootStore } from ".";
import Store, { IStoreContext } from "./Store";

interface ISignInParams {
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
  get isSignedIn(): boolean {
    return Boolean(this.state.entities.user);
  }

  @action
  async signIn(payload: ISignInParams): Promise<void> {
    const resp = await this.ctx.api.post("/signin", payload);

    this.state.entities.user = resp.data.entities.user!;
  }

  @action
  async signOut(): Promise<void> {
    await this.ctx.api.delete("/signout");
    this.state.entities.user = null;
  }
}
