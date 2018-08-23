import { action } from "mobx";
import { denormalize } from "normalizr";
import { catSchema, ICat, IGetCatsRequest } from "~/domain/Cat";
import { serializeParams } from "~/utils";
import Store from "./Store";

export default class CatStore extends Store {
  getCatById(id: string): ICat | undefined {
    return denormalize(id, catSchema, this.state.entities);
  }

  getCatsByIds(ids: string[]): ICat[] {
    return denormalize(ids, [catSchema], this.state.entities).filter(Boolean);
  }

  getCatsByResult(params: IGetCatsRequest): ICat[] {
    const serializedParams = serializeParams(params);
    const ids = this.state.results.cats[serializedParams];

    return ids ? this.getCatsByIds(ids) : [];
  }

  @action
  async fetchCats(params: IGetCatsRequest): Promise<void> {
    const { data } = await this.ctx.api.get("/cats", { params });
    const serializedParams = serializeParams(params);

    this.state.entities.cats = {
      ...this.state.entities.cats,
      ...data.entities.cats
    };

    this.state.results.cats = {
      ...this.state.results.cats,
      [serializedParams]: data.result
    };

    this.state.cats.totalCount = data.meta.totalCount;
  }
}
