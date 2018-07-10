import { ICat } from "~/domain/entities";
import Service from "./Service";

interface IGetCatsParams {
  page: number;
  per: number;
}

const PLACEKITTEN_URL = "https://placekitten.com/200/200";
const PLACEKITTEN_TOTAL_COUNT = 16;
const TOTAL_COUNT = 50;

export default class CatService extends Service {
  get totalCount() {
    return TOTAL_COUNT;
  }

  async getCats({ page, per }: IGetCatsParams): Promise<ICat[]> {
    const offset = Math.min((page - 1) * per, TOTAL_COUNT);
    const limit = Math.min(per, TOTAL_COUNT - offset);

    return Array.from(Array(limit).keys()).map(i => {
      const id = offset + i;
      const imageId = id % PLACEKITTEN_TOTAL_COUNT + 1;

      return {
        id: String(id),
        title: `Cat ${id + 1}`,
        text:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageUrl: `${PLACEKITTEN_URL}?image=${imageId}`
      };
    });
  }
}
