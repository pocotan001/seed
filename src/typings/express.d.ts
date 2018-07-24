import { RootService } from "~/server/service";

declare global {
  namespace Express {
    export interface Request {
      session: CookieSessionInterfaces.CookieSessionObject;
      ctx: {
        service?: RootService;
      };
    }
  }
}
