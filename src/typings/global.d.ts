import { ErrorCode } from "~/infrastructure/error";

declare global {
  declare module "*.json";
  declare module "*.png";
  declare module "*.jpg";
  declare module "*.gif";
  declare module "*.svg";

  export interface Error {
    status?: number; // HTTP status code
    code?: ErrorCode; // Number that indicates the error type that occurred
    data?: any; // Additional information about the error
  }

  export namespace NodeJS {
    export interface ProcessEnv {
      ENV: "test" | "local" | "development" | "staging" | "production";
      NODE_ENV: "test" | "development" | "production";
      DEBUG?: string;
      LOG_LEVEL?: string;
      CLIENT?: "yes";
      PORT?: string; // server only
      TRUST_PROXY?: string; // server only
      SESSION_NAME?: string; // server only
      SESSION_SECRET_1?: string; // server only
      SESSION_SECRET_2?: string; // server only
      SESSION_SECRET_3?: string; // server only
    }
  }
}
