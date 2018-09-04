import { STATUS_CODES } from "http";
import config from "~/config";

// Error codes
// https://godoc.org/google.golang.org/grpc/codes
export enum ErrorCode {
  OK = 0,
  CANCELED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATALOSS = 15,
  UNAUTHENTICATED = 16,
  // Extended codes
  TIMED_OUT = 1000,
  NOT_CONNECTED_TO_INTERNET = 1001,
  UNDER_MAINTENANCE = 1002
}

const StatusCodes: { [C in ErrorCode]?: number } = {
  [ErrorCode.INVALID_ARGUMENT]: 400,
  [ErrorCode.UNAUTHENTICATED]: 401,
  [ErrorCode.PERMISSION_DENIED]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.ALREADY_EXISTS]: 409,
  [ErrorCode.RESOURCE_EXHAUSTED]: 429,
  [ErrorCode.CANCELED]: 499,
  [ErrorCode.INTERNAL]: 500,
  [ErrorCode.UNAVAILABLE]: 503,
  [ErrorCode.DEADLINE_EXCEEDED]: 504,
  [ErrorCode.TIMED_OUT]: 408,
  [ErrorCode.UNDER_MAINTENANCE]: 503
};

export const normalizeError = (err: Error): Error => {
  const status = err.status || StatusCodes[err.code!];

  if (status) {
    err.status = status;
  }

  if (!err.code && config.isClient && !window.navigator.onLine) {
    err.code = ErrorCode.NOT_CONNECTED_TO_INTERNET;
  }

  if (config.isProd) {
    err.message = STATUS_CODES[status!] || "Internal Error";
  }

  return err;
};
