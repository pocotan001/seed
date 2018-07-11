import { omit } from "lodash";
import { RootStore } from "~/store";
import Store, { IStoreContext } from "~/store/Store";

describe("Store", () => {
  describe("new Store(rootStore, ctx)", () => {
    it("should return a some properties", () => {
      const state = { a: true };

      const rootStore: RootStore = {
        state,
        storeA: {},
        storeB: {}
      } as any;

      const ctx: IStoreContext = { b: true } as any;
      const store = new Store(rootStore, ctx);

      expect(store).toHaveProperty("state", state);
      expect(store).toHaveProperty("store", omit(rootStore, "state"));
      expect(store).toHaveProperty("ctx", ctx);
    });
  });
});
