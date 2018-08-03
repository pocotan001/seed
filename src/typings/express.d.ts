import { RootService } from "~/server/service";
import { IUser } from "~/domain/User";

declare global {
  namespace Express {
    interface Session
      extends Pick<
          CookieSessionInterfaces.CookieSessionObject,
          "isChanged" | "isNew" | "isPopulated"
        > {
      token?: string;
      me?: IUser;
    }

    export interface Request {
      session: Session;
      ctx: {
        service?: RootService;
      };
    }
  }
}
