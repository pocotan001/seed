import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: ".env" });
