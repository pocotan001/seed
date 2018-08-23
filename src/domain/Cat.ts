import { schema } from "normalizr";

export interface ICat {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface IGetCatsRequest {
  page: number;
  per: number;
}

export const catSchema = new schema.Entity("cats");
