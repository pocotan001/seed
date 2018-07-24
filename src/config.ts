const config = Object.freeze({
  siteName: "Seed",
  logLevel: process.env.LOG_LEVEL || "TRACE",
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isServer: process.env.CLIENT !== "yes",
  isClient: process.env.CLIENT === "yes"
});

export default config;
