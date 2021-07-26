module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^@/api(.*)$": "<rootDir>src/pages/api/$1",
    "^@/components(.*)$": "<rootDir>src/components/$1",
    "^@/constants(.*)$": "<rootDir>src/constants/$1",
    "^@/hooks(.*)$": "<rootDir>src/hooks/$1",
    "^@/models(.*)$": "<rootDir>src/models/$1",
    "^@/pages(.*)$": "<rootDir>src/pages/$1",
    "^@/utils(.*)$": "<rootDir>src/utils/$1",
    "^@/_quiz(.*)$": "<rootDir>_quiz/$1",
    "^@/public(.*)$": "<rootDir>public/$1",
  },
};
