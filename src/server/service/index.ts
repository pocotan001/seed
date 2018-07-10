import CatService from "./CatService";
import { IServiceContext } from "./Service";
import UserService from "./UserService";

export class RootService {
  cat: CatService;
  user: UserService;

  constructor(ctx: IServiceContext) {
    this.cat = new CatService(this, ctx);
    this.user = new UserService(this, ctx);
  }
}

const createService = (ctx: IServiceContext) => new RootService(ctx);

export default createService;
