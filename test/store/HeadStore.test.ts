import HeadStore from "~/store/HeadStore";
import { defaultState, State } from "~/store/state";
import { StoreContext } from "~/store/Store";

let state: State;
let ctx: StoreContext;

describe("HeadStore", () => {
  beforeEach(() => {
    state = { ...defaultState };
    ctx = {} as any;
  });

  it("#updateTitle(title)", () => {
    const store = new HeadStore(state, ctx);

    store.updateTitle("alo");

    expect(store).toHaveProperty("state.head.title", `alo`);
  });

  it("#updateMeta(meta)", () => {
    const store = new HeadStore(state, ctx);

    store.updateMeta([{ name: "foo" }]);

    expect(store).toHaveProperty("state.head.meta", [{ name: "foo" }]);
  });

  it("#updateLink(link)", () => {
    const store = new HeadStore(state, ctx);

    store.updateLink([{ rel: "foo" }]);

    expect(store).toHaveProperty("state.head.link", [{ rel: "foo" }]);
  });
});
