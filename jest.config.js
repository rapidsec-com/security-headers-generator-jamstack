module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  automock: false,
  transform: {
    // Use official TypeScript Jest transformer
    "\\.(ts|tsx|js|jsx)?$": "ts-jest",
  },
  collectCoverage: false,
};
