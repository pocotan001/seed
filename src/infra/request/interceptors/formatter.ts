import { AxiosError, AxiosResponse } from "axios";
import { ErrorCode, normalizeError } from "~/domain/Error";

enum AxiosErrorCode {
  // Request timeout
  Econnaborted = "ECONNABORTED"
}

export const onFulfilled = (resp: AxiosResponse): AxiosResponse => resp;

export const onRejected = (axiosErr: AxiosError): Promise<never> => {
  const err = axiosErr as Error;

  if (axiosErr.response) {
    const errResp: Error = axiosErr.response.data.error;

    err.status = axiosErr.response.status;

    // Maybe `IApiErrorResponse`
    if (typeof errResp === "object") {
      err.message = errResp.message;
      err.code = errResp.code;

      if (errResp.data) {
        err.data = errResp.data;
      }
    } else {
      err.data = axiosErr.response.data;
    }
  } else if (axiosErr.code === AxiosErrorCode.Econnaborted) {
    err.code = ErrorCode.TimedOut;
  } else {
    err.code = ErrorCode.NotConnectedToInternet;
  }

  return Promise.reject(normalizeError(err));
};
