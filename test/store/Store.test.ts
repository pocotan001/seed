import { State } from "~/store/state";
import Store, { IStoreContext } from "~/store/Store";

describe("Store", () => {
  describe("new Store(rootStore, ctx)", () => {
    it("should return a some properties", () => {
      const state: State = { a: true } as any;
      const ctx: IStoreContext = { b: true } as any;
      const store = new Store(state, ctx);

      expect(store).toHaveProperty("state", state);
      expect(store).toHaveProperty("ctx", ctx);
    });
  });
});
