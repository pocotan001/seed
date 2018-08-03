import { ICat } from "./Cat";

export interface INormalizedEntity<E> {
  [id: string]: E;
}

export interface INormalizedEntities {
  cats: INormalizedEntity<ICat>;
}
