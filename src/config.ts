const config = Object.freeze({
  siteName: "Seed",
  twitterId: "pocotan001",
  facebookId: "pocotan001",
  env: process.env.NODE_ENV,
  origin: process.env.ORIGIN,
  logLevel: process.env.LOG_LEVEL || "DEBUG",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isServer: process.env.CLIENT !== "yes",
  isClient: process.env.CLIENT === "yes"
});

export default config;
