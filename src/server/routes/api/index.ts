import * as express from "express";
import { cache, catcher, csrf } from "../../middleware/api";
import service from "../../middleware/service";
import * as auth from "./auth";
import * as cat from "./cat";

const api = express.Router();

api.use(csrf());
api.use(service());

api.get("/cats", cache(3600), cat.getCats);
api.post("/signin", auth.signIn);
api.delete("/signout", auth.signOut);

api.use(catcher());

export default api;
