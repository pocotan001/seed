import HistoryStore from "~/store/HistoryStore";
import { defaultState, State } from "~/store/state";
import { StoreContext } from "~/store/Store";

let state: State;
let ctx: StoreContext;

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
    const store = new HistoryStore(
      {
        ...state,
        history: {
          location: {
            pathname: "/a",
            search: "",
            state: undefined,
            hash: "",
            key: "abcdef"
          },
          visited: {
            abcdef: true
          }
        }
      },
      ctx
    );

    expect(store.isVisited("abcdef")).toBe(true);
  });

  it("#markAsVisited()", () => {
    const store = new HistoryStore(
      {
        ...state,
        history: {
          location: {
            pathname: "/a",
            search: "",
            state: undefined,
            hash: "",
            key: "abcdef"
          },
          visited: {}
        }
      },
      ctx
    );

    store.markAsVisited();
    expect(store).toHaveProperty("state.history.visited.abcdef", true);
  });

  it("#unmarkAsVisited()", () => {
    const store = new HistoryStore(
      {
        ...state,
        history: {
          location: {
            pathname: "/a",
            search: "",
            state: undefined,
            hash: "",
            key: "abcdef"
          },
          visited: {
            abcdef: true
          }
        }
      },
      ctx
    );

    store.unmarkAsVisited();
    expect(store).toHaveProperty("state.history.visited.abcdef", false);
  });
});
