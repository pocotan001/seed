import { INormalizedEntities } from "./Normalized";

export interface IApiResponse<E = Partial<INormalizedEntities>> {
  entities: E;
  result: string[]; // id[]
}

export interface IApiErrorResponse {
  error: Pick<Error, "message" | "code" | "data">;
}
