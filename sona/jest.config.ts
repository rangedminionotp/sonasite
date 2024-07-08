import type { Config } from "jest";
import nextJest from "next/jest";
const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/__tests__/**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTest.ts"],
};
const createJestConfig = nextJest({ dir: "./" });
export default createJestConfig(config);
