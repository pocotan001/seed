import * as dotenv from "dotenv";

const env = process.env.ENV || "local";

Object.assign(process.env, {
  ENV: env,
  NODE_ENV:
    process.env.NODE_ENV || env === "local" ? "development" : "production"
});

dotenv.config({ path: `.env.${env}` });
dotenv.config({ path: ".env" });
