import { RootService } from "~/server/service";
import { User } from "~/domain/User";

declare global {
  namespace Express {
    interface Session
      extends Pick<
          CookieSessionInterfaces.CookieSessionObject,
          "isChanged" | "isNew" | "isPopulated"
        > {
      token?: string;
      me?: User;
    }

    export interface Request {
      session: Session;
      service: RootService;
    }
  }
}
