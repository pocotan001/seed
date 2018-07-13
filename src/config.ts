const config = Object.freeze({
  siteName: "Seed",
  logLevel: process.env.LOG_LEVEL || "TRACE",
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === "production",
  isLocal: process.env.NODE_ENV === "local",
  isServer: Boolean(process.env.SERVER),
  isClient: Boolean(process.env.CLIENT)
});

export default config;
