import { action } from "mobx";
import { State } from "./state";
import Store from "./Store";

type IHistory = State["history"];

export default class HistoryStore extends Store {
  push = this.ctx.history.push;
  replace = this.ctx.history.replace;
  go = this.ctx.history.go;
  goBack = this.ctx.history.goBack;
  goForward = this.ctx.history.goForward;

  isVisited(key?: string) {
    return Boolean(key && this.state.history.visited[key]);
  }

  @action
  updateLocation(location: IHistory["location"]) {
    if (location.key) {
      this.state.history = {
        ...this.state.history,
        location,
        visited: {
          ...this.state.history.visited,
          [location.key]: true
        }
      };
    } else {
      this.state.history.location = location;
    }
  }
}
