import { ICat } from "./Cat";
import { IUser } from "./User";

export interface INormalizedEntity<E> {
  [id: string]: E;
}

export interface INormalizedEntities {
  user: IUser | null;
  cats: INormalizedEntity<ICat>;
}
