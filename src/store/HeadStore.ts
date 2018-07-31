import { action } from "mobx";
import config from "~/config";
import { State } from "./state";
import Store from "./Store";

type IHead = State["head"];

const createTitle = (title?: string) =>
  title ? `${title} - ${config.siteName}` : config.siteName;

export default class HeadStore extends Store {
  @action
  setTitle(title?: string): void {
    this.state.head.title = createTitle(title);
  }

  @action
  setMeta(meta: IHead["meta"] = []): void {
    this.state.head.meta = meta;
  }

  @action
  setLink(link: IHead["link"] = []): void {
    this.state.head.link = link;
  }
}
