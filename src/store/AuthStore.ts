import { action, computed } from "mobx";
import Store from "./Store";

interface ISignInParams {
  email: string;
  password: string;
}

export default class AuthStore extends Store {
  @computed
  get isSignedIn(): boolean {
    return Boolean(this.state.auth.me);
  }

  @action
  async signIn(params: ISignInParams): Promise<void> {
    const resp = await this.ctx.api.post("/signin", params);

    this.state.auth.me = resp.data.me;
  }

  @action
  async signOut(): Promise<void> {
    await this.ctx.api.delete("/signout");
    delete this.state.auth.me;
  }
}
