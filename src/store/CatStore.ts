import { action } from "mobx";
import { denormalize } from "normalizr";
import { ICat } from "~/domain/Cat";
import catSchema from "~/domain/catSchema";
import { serializeParams } from "~/utils";
import Store from "./Store";

interface IGetCatsParams {
  page: number;
  per: number;
}

export default class CatStore extends Store {
  getCatById(id: string): ICat | undefined {
    return denormalize(id, catSchema, this.state.entities);
  }

  getCatsByIds(ids: string[]): ICat[] {
    return denormalize(ids, [catSchema], this.state.entities).filter(Boolean);
  }

  getCatsByResult(params: IGetCatsParams): ICat[] {
    const serializedParams = serializeParams(params);
    const ids = this.state.results.cats[serializedParams];

    return ids ? this.getCatsByIds(ids) : [];
  }

  @action
  async fetchCats(payload: IGetCatsParams): Promise<void> {
    const resp = await this.ctx.api.get("/cats", { params: payload });
    const serializedParams = serializeParams(payload);

    this.state.entities.cats = {
      ...this.state.entities.cats,
      ...resp.data.entities.cats
    };

    this.state.results.cats = {
      ...this.state.results.cats,
      [serializedParams]: resp.data.result
    };

    this.state.cats.totalCount = Number(resp.headers["x-total-count"]);
  }
}
