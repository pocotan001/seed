import { AxiosError, AxiosResponse } from "axios";
import { ErrorCode, normalizeError } from "~/infrastructure/error";

const CODE_ECONNABORTED = "ECONNABORTED";

export const onFulfilled = (resp: AxiosResponse): AxiosResponse => resp;

export const onRejected = (e: any): Promise<never> => {
  const err = e as Error;
  const axiosErr = e as AxiosError;

  if (axiosErr.response) {
    const apiErr: Error = axiosErr.response.data.error;

    err.status = axiosErr.response.status;

    // Maybe `IApiErrorResponse`
    if (apiErr) {
      err.message = apiErr.message;
      err.code = apiErr.code;

      if (apiErr.data) {
        err.data = apiErr.data;
      }
    }
  } else if (axiosErr.code === CODE_ECONNABORTED) {
    err.status = 408;
    err.code = ErrorCode.INTERNAL; // Override `CODE_ECONNABORTED`
  } else {
    // Network Error
    err.status = 500;
  }

  return Promise.reject(normalizeError(err));
};
