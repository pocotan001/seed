import CatStore from "./CatStore";
import HeadStore from "./HeadStore";
import HistoryStore from "./HistoryStore";
import LoadingStore from "./LoadingStore";
import { State } from "./state";
import { IStoreContext } from "./Store";
import UserStore from "./UserStore";

export class RootStore {
  state: State;
  head: HeadStore;
  history: HistoryStore;
  loading: LoadingStore;
  user: UserStore;
  cat: CatStore;

  constructor(state: State, ctx: IStoreContext) {
    this.state = state;
    this.head = new HeadStore(this, ctx);
    this.history = new HistoryStore(this, ctx);
    this.loading = new LoadingStore(this, ctx);
    this.user = new UserStore(this, ctx);
    this.cat = new CatStore(this, ctx);
  }
}

const createStore = (state: State, ctx: IStoreContext) =>
  new RootStore(state, ctx);

export default createStore;
