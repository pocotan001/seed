import AuthenticationService from "./AuthenticationService";
import CatService from "./CatService";
import { IServiceContext } from "./Service";

export class RootService {
  cat: CatService;
  auth: AuthenticationService;

  constructor(ctx: IServiceContext) {
    this.cat = new CatService(ctx);
    this.auth = new AuthenticationService(ctx);
  }
}

const createService = (ctx: IServiceContext) => new RootService(ctx);

export default createService;
