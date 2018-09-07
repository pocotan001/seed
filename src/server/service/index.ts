import AutheService from "./AuthService";
import CatService from "./CatService";
import { ServiceContext } from "./Service";

export class RootService {
  auth: AutheService;
  cat: CatService;

  constructor(ctx: ServiceContext) {
    this.auth = new AutheService(ctx);
    this.cat = new CatService(ctx);
  }
}

const createService = (ctx: ServiceContext) => new RootService(ctx);

export default createService;
