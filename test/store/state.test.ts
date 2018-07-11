import { isObservable } from "mobx";
import createState, { defaultState, State } from "~/store/state";

describe("State", () => {
  describe("createState(initialState)", () => {
    it("should return a `State` instance", () => {
      const state = createState();

      expect(state).toBeInstanceOf(State);
    });

    it("should be observable", () => {
      const state = createState();

      expect(isObservable(state)).toBe(true);
    });

    it("should return a default state", () => {
      const state = createState();

      expect(state).toEqual(defaultState);
    });

    it("should return a state with initial values", () => {
      const state = createState({ a: { b: true } } as any);

      expect(state).not.toEqual(defaultState);
      expect(state).toHaveProperty("a.b", true);
    });
  });
});
