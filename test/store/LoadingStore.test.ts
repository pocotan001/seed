import LoadingStore from "~/store/LoadingStore";
import { defaultState, State } from "~/store/state";
import { IStoreContext } from "~/store/Store";

let state: State;
let ctx: IStoreContext;

describe("LoadingStore", () => {
  beforeEach(() => {
    state = { ...defaultState };
    ctx = {} as any;
  });

  it("#increase(n)", () => {
    const store = new LoadingStore(state, ctx);

    store.increase(10);
    expect(store).toHaveProperty("state.loading.percent", 10);

    store.increase(10);
    expect(store).toHaveProperty("state.loading.percent", 20);
  });

  it("#start()", () => {
    jest.useFakeTimers();
    const store = new (require("~/store/LoadingStore")).default(state, {});

    store.start();

    // FIXME: not work
    // jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalled();
  });

  it("#finish()", () => {
    jest.useFakeTimers();
    const store = new (require("~/store/LoadingStore")).default(state, {});

    store.finish();

    // FIXME: not work
    // jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalled();
  });
});
