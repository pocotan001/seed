import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import * as formatter from "./interceptors/formatter";
import * as logger from "./interceptors/logger";

export type Request = AxiosInstance;

const DEFAULT_RETRIES = 2;
const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
};

const createRequest = (givenConfig: AxiosRequestConfig = {}): Request => {
  const request = axios.create({
    ...defaultConfig,
    ...givenConfig,
    headers: {
      ...defaultConfig.headers,
      ...givenConfig.headers
    }
  });

  axiosRetry(request, { retries: DEFAULT_RETRIES });
  request.interceptors.response.use(logger.onFulfilled, logger.onRejected);
  request.interceptors.response.use(
    formatter.onFulfilled,
    formatter.onRejected
  );

  return request;
};

export default createRequest;
