import * as express from "express";
import * as cat from "./cat";
import * as user from "./user";

const api = express.Router();

api.get("/cats", cat.getCats);
api.post("/signin", user.signIn);
api.delete("/signout", user.signOut);

export default api;
