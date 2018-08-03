import AppStore from "./AppStore";
import AuthenticationStore from "./AuthenticationStore";
import CatStore from "./CatStore";
import HeadStore from "./HeadStore";
import HistoryStore from "./HistoryStore";
import LoadingStore from "./LoadingStore";
import SessionStore from "./SessionStore";
import { State } from "./state";
import { IStoreContext } from "./Store";

export class RootStore {
  state: State;
  app: AppStore;
  auth: AuthenticationStore;
  head: HeadStore;
  history: HistoryStore;
  loading: LoadingStore;
  session: SessionStore;
  cat: CatStore;

  constructor(state: State, ctx: IStoreContext) {
    this.state = state;
    this.app = new AppStore(state, ctx);
    this.auth = new AuthenticationStore(state, ctx);
    this.head = new HeadStore(state, ctx);
    this.history = new HistoryStore(state, ctx);
    this.loading = new LoadingStore(state, ctx);
    this.session = new SessionStore(state, ctx);
    this.cat = new CatStore(state, ctx);
  }
}

const createStore = (state: State, ctx: IStoreContext) =>
  new RootStore(state, ctx);

export default createStore;
