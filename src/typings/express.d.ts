import { RootService } from "~/server/service";

declare global {
  namespace Express {
    export interface Request {
      ctx: {
        service?: RootService;
      };
    }
  }
}
