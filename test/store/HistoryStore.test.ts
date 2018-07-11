import { RootStore } from "~/store";
import HistoryStore from "~/store/HistoryStore";
import { defaultState } from "~/store/state";
import { IStoreContext } from "~/store/Store";

let rootStore: RootStore;
let ctx: IStoreContext;

describe("HistoryStore", () => {
  beforeEach(() => {
    rootStore = {
      state: { ...defaultState }
    } as any;

    ctx = {
      history: {
        push: () => undefined,
        replace: () => undefined,
        go: () => undefined,
        goBack: () => undefined,
        goForward: () => undefined
      }
    } as any;
  });

  it("#updateLocation(location)", () => {
    const store = new HistoryStore(rootStore, ctx);

    store.updateLocation({
      pathname: "/a",
      search: "",
      state: undefined,
      hash: "",
      key: "abcdef"
    });

    expect(rootStore).toHaveProperty("state.history.location.pathname", "/a");
    expect(rootStore).toHaveProperty("state.history.location.key", "abcdef");
  });

  it("#isVisited(key)", () => {
    const store = new HistoryStore(rootStore, ctx);

    expect(store.isVisited("abcdef")).toBe(false);

    store.updateLocation({
      pathname: "/a",
      search: "",
      state: undefined,
      hash: "",
      key: "abcdef"
    });

    expect(store.isVisited("abcdef")).toBe(true);
  });
});
