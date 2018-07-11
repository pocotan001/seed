import config from "~/config";
import { RootStore } from "~/store";
import HeadStore from "~/store/HeadStore";
import { defaultState } from "~/store/state";

let rootStore: RootStore;

describe("HeadStore", () => {
  beforeEach(() => {
    rootStore = {
      state: { ...defaultState }
    } as any;
  });

  it("#updateTitle(title)", () => {
    const store = new HeadStore(rootStore, {} as any);

    store.updateTitle("alo");

    expect(rootStore).toHaveProperty(
      "state.head.title",
      `alo - ${config.siteName}`
    );
  });

  it("#updateMeta(meta)", () => {
    const store = new HeadStore(rootStore, {} as any);

    store.updateMeta([{ charSet: "a" }]);

    expect(rootStore).toHaveProperty("state.head.meta", [{ charSet: "a" }]);
  });
});
