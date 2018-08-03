import HistoryStore from "~/store/HistoryStore";
import { defaultState, State } from "~/store/state";
import { IStoreContext } from "~/store/Store";

let state: State;
let ctx: IStoreContext;

describe("HistoryStore", () => {
  beforeEach(() => {
    state = { ...defaultState };
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
    const store = new HistoryStore(state, ctx);

    store.updateLocation({
      pathname: "/a",
      search: "",
      state: undefined,
      hash: "",
      key: "abcdef"
    });

    expect(store).toHaveProperty("state.history.location.pathname", "/a");
    expect(store).toHaveProperty("state.history.location.key", "abcdef");
  });

  it("#isVisited(key)", () => {
    const store = new HistoryStore(state, ctx);

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
