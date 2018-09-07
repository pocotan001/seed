import { action } from "mobx";
import { State } from "./state";
import Store from "./Store";

type History = State["history"];

export default class HistoryStore extends Store {
  push = this.ctx.history.push;
  replace = this.ctx.history.replace;
  go = this.ctx.history.go;
  goBack = this.ctx.history.goBack;
  goForward = this.ctx.history.goForward;
  block = this.ctx.history.block;

  isVisited(key?: string) {
    return Boolean(key && this.state.history.visited[key]);
  }

  @action
  updateLocation(location: History["location"]) {
    this.state.history.location = location;
  }

  @action
  markAsVisited() {
    const { key } = this.state.history.location;

    if (!key) {
      return;
    }

    this.state.history.visited = {
      ...this.state.history.visited,
      [key]: true
    };
  }

  @action
  unmarkAsVisited() {
    const { key } = this.state.history.location;

    if (!key) {
      return;
    }

    this.state.history.visited = {
      ...this.state.history.visited,
      [key]: false
    };
  }
}
