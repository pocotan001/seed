import { AxiosPromise, AxiosRequestConfig } from "axios";
import * as express from "express-serve-static-core";
import { History } from "history";
import { IApiResponse } from "~/domain/Api";
import { Request } from "~/infrastructure/request";
import { RootStore } from ".";

interface IApiClient
  extends Omit<Request, "request" | "get" | "post" | "put" | "patch"> {
  request(config: AxiosRequestConfig): AxiosPromise<IApiResponse>;
  get(url: string, config?: AxiosRequestConfig): AxiosPromise<IApiResponse>;
  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<IApiResponse>;
  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<IApiResponse>;
  patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<IApiResponse>;
}

export interface IStoreContext {
  history: History;
  api: IApiClient;
  req?: express.Request; // server only
  res?: express.Response; // server only
}

export default class Store {
  protected state: RootStore["state"];
  protected store: Omit<RootStore, "state">;
  protected ctx: IStoreContext;

  constructor({ state, ...store }: RootStore, ctx: IStoreContext) {
    this.state = state;
    this.store = store;
    this.ctx = ctx;
  }
}
