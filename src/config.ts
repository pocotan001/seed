const config = Object.freeze({
  siteName: "Seed",
  logLevel: process.env.LOG_LEVEL || "TRACE",
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isServer: Boolean(process.env.SERVER),
  isClient: Boolean(process.env.CLIENT)
});

export default config;
