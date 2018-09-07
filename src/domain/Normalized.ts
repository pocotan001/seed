import { Cat } from "./Cat";

export interface NormalizedEntity<E> {
  [id: string]: E;
}

export interface NormalizedEntities {
  cats: NormalizedEntity<Cat>;
}
