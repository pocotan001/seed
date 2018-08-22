import { action } from "mobx";
import { SessionKey } from "./state";
import Store from "./Store";

export default class SessionStore extends Store {
  @action
  set(key: SessionKey, value: any): void {
    this.state.session = {
      ...this.state.session,
      [key]: value
    };
  }

  @action
  remove(key: SessionKey): void {
    this.state.session[key] = {};
  }

  @action
  clear(): void {
    this.state.session = {};
  }
}
