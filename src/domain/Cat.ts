import { schema } from "normalizr";

export interface Cat {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface GetCatsRequest {
  page: number;
  per: number;
}

export const catSchema = new schema.Entity("cats");
