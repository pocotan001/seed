import { STATUS_CODES } from "http";
import config from "~/config";

// Error codes
// https://godoc.org/google.golang.org/grpc/codes
export enum ErrorCode {
  Ok = 0,
  Canceled = 1,
  Unknown = 2,
  InvalidArgument = 3,
  DeadlineExceeded = 4,
  NotFound = 5,
  AlreadyExists = 6,
  PermissionDenied = 7,
  ResourceExhausted = 8,
  FailedPrecondition = 9,
  Aborted = 10,
  OutOfRange = 11,
  Unimplemented = 12,
  Internal = 13,
  Unavailable = 14,
  Dataloss = 15,
  Unauthenticated = 16,
  // Extended codes
  TimedOut = 1000,
  NotConnectedToInternet = 1001,
  UnderMaintenance = 1002
}

const StatusCodes: { [T in ErrorCode]?: number } = {
  [ErrorCode.InvalidArgument]: 400,
  [ErrorCode.Unauthenticated]: 401,
  [ErrorCode.PermissionDenied]: 403,
  [ErrorCode.NotFound]: 404,
  [ErrorCode.AlreadyExists]: 409,
  [ErrorCode.ResourceExhausted]: 429,
  [ErrorCode.Canceled]: 499,
  [ErrorCode.Internal]: 500,
  [ErrorCode.Unavailable]: 503,
  [ErrorCode.DeadlineExceeded]: 504,
  [ErrorCode.TimedOut]: 408,
  [ErrorCode.UnderMaintenance]: 503
};

export const normalizeError = (err: Error): Error => {
  const status = err.status || StatusCodes[err.code!];

  if (status) {
    err.status = status;
  }

  if (!err.code && config.isClient && !window.navigator.onLine) {
    err.code = ErrorCode.NotConnectedToInternet;
  }

  if (config.isProd) {
    err.message = STATUS_CODES[status!] || "Internal Error";
  }

  return err;
};
