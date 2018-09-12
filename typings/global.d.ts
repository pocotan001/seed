import { ErrorCode } from "~/domain/Error";

declare global {
  declare module "*.json";

  export interface Error {
    status?: number; // HTTP status code
    code?: ErrorCode; // Number that indicates the error type that occurred
    data?: any; // Additional information about the error
  }

  export namespace NodeJS {
    export interface ProcessEnv {
      ENV: "test" | "local" | "development" | "staging" | "production";
      NODE_ENV: "test" | "development" | "production";
      ORIGIN: string;
      CLIENT?: "yes";
      DEBUG?: string;
      LOG_LEVEL?: string;
      PORT?: string; // server only
      TRUST_PROXY?: string; // server only
      SESSION_NAME?: string; // server only
      SESSION_SECRET_1?: string; // server only
      SESSION_SECRET_2?: string; // server only
      SESSION_SECRET_3?: string; // server only
    }
  }
}
