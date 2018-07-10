import { action } from "mobx";
import config from "~/config";
import { State } from "./state";
import Store from "./Store";

type IHead = State["head"];

const createTitle = (title?: string) =>
  title ? `${title} - ${config.siteName}` : config.siteName;

export default class HeadStore extends Store {
  @action
  updateTitle(title?: IHead["title"]) {
    this.state.head.title = createTitle(title);
  }

  @action
  updateMeta(meta: IHead["meta"] = []) {
    this.state.head.meta = meta;
  }
}
