const config = Object.freeze({
  siteName: "Seed",
  apiPath: "/api",
  logLevel: process.env.LOG_LEVEL || "TRACE",
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV === "development",
  isServer: process.env.SERVER === "yes",
  isClient: process.env.CLIENT === "yes"
});

export default config;
