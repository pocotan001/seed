import * as crypto from "crypto";
import { RequestHandler } from "express-serve-static-core";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);
const generateNonce = () => randomBytes(16).then(buf => buf.toString("base64"));

const nonce = (): RequestHandler => async (_, res, next) => {
  res.locals.nonce = await generateNonce();
  next();
};

export default nonce;
