import { action } from "mobx";
import config from "~/config";
import { State } from "./state";
import Store from "./Store";

type Head = State["head"];

export default class HeadStore extends Store {
  @action
  updateTitle(title: string = config.siteName): void {
    this.state.head.title = title;
  }

  @action
  updateMeta(meta: Head["meta"] = []): void {
    this.state.head.meta = meta;
  }

  @action
  updateLink(link: Head["link"] = []): void {
    this.state.head.link = link;
  }
}
