import config from "~/config";
import HeadStore from "~/store/HeadStore";
import { defaultState, State } from "~/store/state";
import { IStoreContext } from "~/store/Store";

let state: State;
let ctx: IStoreContext;

describe("HeadStore", () => {
  beforeEach(() => {
    state = { ...defaultState };
    ctx = {} as any;
  });

  it("#updateTitle(title)", () => {
    const store = new HeadStore(state, ctx);

    store.setTitle("alo");

    expect(store).toHaveProperty(
      "state.head.title",
      `alo - ${config.siteName}`
    );
  });

  it("#updateMeta(meta)", () => {
    const store = new HeadStore(state, ctx);

    store.setMeta([{ charSet: "a" }]);

    expect(store).toHaveProperty("state.head.meta", [{ charSet: "a" }]);
  });
});
