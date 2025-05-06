module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/App.tsx',
    '!src/**/main.tsx',
    '!src/**/*.style.ts', 
    '!src/**/*.const.ts',
    '!src/**/*.mock.ts',
    '!src/**/*.conts.ts',
    '!src/**/*.type.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-leaflet|@react-leaflet|leaflet)/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mock__/styleMock.js', // Correct path for CSS mock
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};