module.exports = {
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
  collectCoverageFrom: [
    '**/bin/**/*.js',
    '**/lib/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    'nixplay-ws-protocol': '<rootDir>/__mocks__/nixplay-ws-protocol/',
  },
};
