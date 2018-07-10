import * as crypto from "crypto";
import { RequestHandler } from "express-serve-static-core";

const generateNonce = () => crypto.pseudoRandomBytes(36).toString("base64");

const nonce = (): RequestHandler => (_, res, next) => {
  res.locals.nonce = generateNonce();
  next();
};

export default nonce;
