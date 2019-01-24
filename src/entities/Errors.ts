// Number that indicates the error type that occurred
export enum ErrorCode {
  Internal = 0,
  NotFound = 1,
  TimedOut = 2,
  NotConnectedToInternet = 3,
  UnderMaintenance = 4
}

export interface ErrorResponse {
  message: string;
  code: ErrorCode;
}
