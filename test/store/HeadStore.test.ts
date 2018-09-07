import config from "~/config";
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

  it("#setTitle(title)", () => {
    const store = new HeadStore(state, ctx);

    store.setTitle("alo");

    expect(store).toHaveProperty(
      "state.head.title",
      `alo - ${config.siteName}`
    );
  });

  it("#setMeta(meta)", () => {
    const store = new HeadStore(state, ctx);

    store.setMeta([{ charSet: "a" }]);

    expect(store).toHaveProperty("state.head.meta", [{ charSet: "a" }]);
  });
});
