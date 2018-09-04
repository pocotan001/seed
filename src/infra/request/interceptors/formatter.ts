import { AxiosError, AxiosResponse } from "axios";
import { ErrorCode, normalizeError } from "~/domain/Error";

enum AxiosErrorCode {
  // Request timeout
  ECONNABORTED = "ECONNABORTED"
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
  } else if (axiosErr.code === AxiosErrorCode.ECONNABORTED) {
    err.code = ErrorCode.TIMED_OUT;
  } else {
    err.code = ErrorCode.NOT_CONNECTED_TO_INTERNET;
  }

  return Promise.reject(normalizeError(err));
};
