import * as dotenv from "dotenv";

process.env.ENV = process.env.ENV || "local";
process.env.NODE_ENV =
  process.env.ENV === "local" ? "development" : "production";

dotenv.config({ path: `.env.${process.env.ENV}` });
dotenv.config({ path: ".env" });
