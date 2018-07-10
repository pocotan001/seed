import * as express from "express";
import * as cat from "./cat";
import * as user from "./user";

const routes = (): express.Router => {
  const api = express.Router();

  api.get("/cats", cat.getCats);
  api.post("/login", user.login);
  api.delete("/logout", user.logout);

  return api;
};

export default routes;
