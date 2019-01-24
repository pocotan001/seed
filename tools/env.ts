import dotenv from "dotenv";

const ENV = process.env.ENV || "local";

Object.assign(process.env, {
  ENV,
  NODE_ENV:
    process.env.NODE_ENV || (ENV === "local" ? "development" : "production")
});

dotenv.config({ path: `.env.${ENV}` });
dotenv.config({ path: ".env" });
