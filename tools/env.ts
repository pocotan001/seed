import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.local" });
}

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: ".env" });
