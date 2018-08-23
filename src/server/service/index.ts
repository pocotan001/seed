import AutheService from "./AuthService";
import CatService from "./CatService";
import { IServiceContext } from "./Service";

export class RootService {
  auth: AutheService;
  cat: CatService;

  constructor(ctx: IServiceContext) {
    this.auth = new AutheService(ctx);
    this.cat = new CatService(ctx);
  }
}

const createService = (ctx: IServiceContext) => new RootService(ctx);

export default createService;
