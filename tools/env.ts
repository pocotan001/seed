import * as dotenv from "dotenv";

const ENV = process.env.ENV || "local";
const NODE_ENV =
  process.env.NODE_ENV || (ENV === "local" ? "development" : "production");

Object.assign(process.env, { ENV, NODE_ENV });

dotenv.config({ path: `.env.${ENV}` });
dotenv.config({ path: ".env" });
