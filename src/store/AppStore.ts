import { action } from "mobx";
import Store from "./Store";

export default class AppStore extends Store {
  @action
  markAsError() {
    this.state.app.hasError = true;
  }

  @action
  unmarkAsError() {
    this.state.app.hasError = false;
  }
}
