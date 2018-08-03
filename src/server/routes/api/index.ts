import * as express from "express";
import * as auth from "./auth";
import * as cat from "./cat";

const api = express.Router();

api.get("/cats", cat.getCats);
api.post("/signin", auth.signIn);
api.delete("/signout", auth.signOut);

export default api;
