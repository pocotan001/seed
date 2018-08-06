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
  UNAUTHENTICATED = 16
}

const ErrorCodes: { [status: number]: ErrorCode | undefined } = {
  400: ErrorCode.INVALID_ARGUMENT,
  401: ErrorCode.UNAUTHENTICATED,
  403: ErrorCode.PERMISSION_DENIED,
  404: ErrorCode.NOT_FOUND,
  409: ErrorCode.ALREADY_EXISTS,
  429: ErrorCode.RESOURCE_EXHAUSTED,
  499: ErrorCode.CANCELED,
  500: ErrorCode.INTERNAL,
  503: ErrorCode.UNAVAILABLE,
  504: ErrorCode.DEADLINE_EXCEEDED
};

export const normalizeError = (err: Error): Error => {
  err.status = err.status || 500;
  err.code = err.code || ErrorCodes[err.status] || ErrorCodes[500]!;

  if (config.isProd) {
    err.message = STATUS_CODES[err.status] || STATUS_CODES[500]!;
  }

  return err;
};
