const nextJest = require("next/jest");
const createJestConfig = nextJest();

/** @type {import("jest").Config} */
const config = {
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/src/$1" },
  testEnvironment: "jest-environment-jsdom",
  transform: { "\\.css\\.ts$": "@vanilla-extract/jest-transform" },
};

module.exports = createJestConfig(config);
