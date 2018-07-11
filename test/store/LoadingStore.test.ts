import { RootStore } from "~/store";
import LoadingStore from "~/store/LoadingStore";
import { defaultState } from "~/store/state";

let rootStore: RootStore;

describe("LoadingStore", () => {
  beforeEach(() => {
    rootStore = {
      state: { ...defaultState }
    } as any;
  });

  it("#increase(n)", () => {
    const store = new LoadingStore(rootStore, {} as any);

    store.increase(10);

    expect(rootStore).toHaveProperty("state.loading.percent", 10);

    store.increase(10);

    expect(rootStore).toHaveProperty("state.loading.percent", 20);
  });

  it("#start()", () => {
    jest.useFakeTimers();
    const store = new (require("~/store/LoadingStore")).default(rootStore, {});

    store.start();

    // FIXME: not work
    // jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalled();
  });

  it("#finish()", () => {
    jest.useFakeTimers();
    const store = new (require("~/store/LoadingStore")).default(rootStore, {});

    store.finish();

    // FIXME: not work
    // jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalled();
  });
});
