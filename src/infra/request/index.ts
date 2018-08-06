import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as formatter from "./interceptors/formatter";
import * as logger from "./interceptors/logger";

export type Request = AxiosInstance;

const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
};

const createRequest = (opts: AxiosRequestConfig = {}): Request => {
  const request = axios.create({
    ...defaultConfig,
    ...opts,
    headers: {
      ...defaultConfig.headers,
      ...opts.headers
    }
  });

  request.interceptors.response.use(logger.onFulfilled, logger.onRejected);
  request.interceptors.response.use(
    formatter.onFulfilled,
    formatter.onRejected
  );

  return request;
};

export default createRequest;
