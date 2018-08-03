import { serializeParams } from "~/infrastructure/utils";
import CatStore from "~/store/CatStore";
import { defaultState, State } from "~/store/state";
import { IStoreContext } from "~/store/Store";
import cats from "../mocks/data/cats";

let state: State;
let ctx: IStoreContext;

describe("CatStore", () => {
  beforeEach(() => {
    state = { ...defaultState };
    ctx = {} as any;
  });

  it("#getCatById(id)", () => {
    state.entities.cats = { ...cats };

    const store = new CatStore(state, ctx);

    expect(store.getCatById("0")).toEqual(cats["0"]);
    expect(store.getCatById("1")).toEqual(cats["1"]);
    expect(store.getCatById("none")).toBeUndefined();
  });

  it("#getCatsByIds(ids)", () => {
    state.entities.cats = { ...cats };

    const store = new CatStore(state, ctx);

    expect(store.getCatsByIds(["0"])).toHaveLength(1);
    expect(store.getCatsByIds(["0"])).toEqual([cats["0"]]);
    expect(store.getCatsByIds(["0", "1"])).toHaveLength(2);
    expect(store.getCatsByIds(["0", "1"])).toEqual([cats["0"], cats["1"]]);
    expect(store.getCatsByIds(["none"])).toHaveLength(0);
  });

  it("#getCatsByResult(params)", () => {
    state.entities.cats = { ...cats };
    state.results.cats = {
      [serializeParams({ page: 1, per: 3 })]: Object.keys(cats)
    };

    const store = new CatStore(state, ctx);

    expect(store.getCatsByResult({ page: 1, per: 3 })).toHaveLength(3);
    expect(store.getCatsByResult({ page: 1, per: 3 })).toEqual([
      cats["0"],
      cats["1"],
      cats["2"]
    ]);
    expect(store.getCatsByResult({ page: -1, per: -1 })).toHaveLength(0);
  });

  it("#fetchCats(payload)", async () => {
    ctx = {
      api: {
        get: jest.fn((url: string) => {
          if (url !== "/cats") {
            return null;
          }

          return {
            headers: {
              "x-total-count": "3"
            },
            data: {
              entities: {
                cats
              },
              result: Object.keys(cats)
            }
          };
        })
      }
    } as any;

    const store = new CatStore(state, ctx);

    await store.fetchCats({ page: 1, per: 3 });

    expect(ctx.api.get).toHaveBeenCalledTimes(1);
    expect(ctx.api.get).toHaveBeenCalledWith("/cats", {
      params: { page: 1, per: 3 }
    });
    expect(store).toHaveProperty("state.entities.cats", cats);
    expect(store).toHaveProperty("state.results.cats", {
      [serializeParams({ page: 1, per: 3 })]: Object.keys(cats)
    });
    expect(store).toHaveProperty("state.cats.totalCount", 3);
  });
});
