import { serializeParams } from "~/infrastructure/utils";
import { RootStore } from "~/store";
import CatStore from "~/store/CatStore";
import { defaultState } from "~/store/state";
import { IStoreContext } from "~/store/Store";
import cats from "../mocks/entities/cats";

let rootStore: RootStore;

describe("CatStore", () => {
  beforeEach(() => {
    rootStore = {
      state: {
        ...defaultState,
        ...{
          entities: {
            ...defaultState.entities,
            cats
          },
          results: {
            ...defaultState.results,
            cats: {
              [serializeParams({ page: 1, per: 3 })]: Object.keys(cats)
            }
          },
          cats: {
            totalCount: Object.keys(cats).length
          }
        }
      }
    } as any;
  });

  it("#getCatById(id)", () => {
    const store = new CatStore(rootStore, {} as any);

    expect(store.getCatById("0")).toEqual(cats["0"]);
    expect(store.getCatById("1")).toEqual(cats["1"]);
    expect(store.getCatById("none")).toBeUndefined();
  });

  it("#getCatsByIds(ids)", () => {
    const store = new CatStore(rootStore, {} as any);

    expect(store.getCatsByIds(["0"])).toHaveLength(1);
    expect(store.getCatsByIds(["0"])).toEqual([cats["0"]]);
    expect(store.getCatsByIds(["0", "1"])).toHaveLength(2);
    expect(store.getCatsByIds(["0", "1"])).toEqual([cats["0"], cats["1"]]);
    expect(store.getCatsByIds(["none"])).toHaveLength(0);
  });

  it("#getCatsByResult(params)", () => {
    const store = new CatStore(rootStore, {} as any);

    expect(store.getCatsByResult({ page: 1, per: 3 })).toHaveLength(3);
    expect(store.getCatsByResult({ page: 1, per: 3 })).toEqual([
      cats["0"],
      cats["1"],
      cats["2"]
    ]);
    expect(store.getCatsByResult({ page: -1, per: -1 })).toHaveLength(0);
  });

  it("#fetchCats(payload)", async () => {
    rootStore.state.entities.cats = {};
    rootStore.state.results.cats = {};
    rootStore.state.cats.totalCount = 0;

    const ctx: IStoreContext = {
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

    const store = new CatStore(rootStore, ctx);

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
