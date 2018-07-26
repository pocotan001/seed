import AppStore from "./AppStore";
import CatStore from "./CatStore";
import HeadStore from "./HeadStore";
import HistoryStore from "./HistoryStore";
import LoadingStore from "./LoadingStore";
import SessionStore from "./SessionStore";
import { State } from "./state";
import { IStoreContext } from "./Store";
import UserStore from "./UserStore";

export class RootStore {
  state: State;
  app: AppStore;
  head: HeadStore;
  history: HistoryStore;
  loading: LoadingStore;
  session: SessionStore;
  user: UserStore;
  cat: CatStore;

  constructor(state: State, ctx: IStoreContext) {
    this.state = state;
    this.app = new AppStore(this, ctx);
    this.head = new HeadStore(this, ctx);
    this.history = new HistoryStore(this, ctx);
    this.loading = new LoadingStore(this, ctx);
    this.session = new SessionStore(this, ctx);
    this.user = new UserStore(this, ctx);
    this.cat = new CatStore(this, ctx);
  }
}

const createStore = (state: State, ctx: IStoreContext) =>
  new RootStore(state, ctx);

export default createStore;
