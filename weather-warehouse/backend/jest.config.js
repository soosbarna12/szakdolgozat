module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Use ts-jest for both TypeScript and JavaScript
  },
  testEnvironment: 'node', // Use Node.js environment for backend testing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transformIgnorePatterns: ['node_modules/(?!(validate.js)/)'], // Allow transformation of validate.js if needed
};