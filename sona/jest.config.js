// module.exports = {
//   testEnvironment: "node",
//   preset: "ts-jest",
//   testMatch: ["<rootDir>/tests/**/*.test.ts"],
//   globals: {
//     "ts-jest": {
//       tsconfig: "tsconfig.jest.json",
//     },
//   },
// };

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/pages/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/node_modules/**"],
  collectCoverage: true,
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
module.exports = createJestConfig(customJestConfig);
