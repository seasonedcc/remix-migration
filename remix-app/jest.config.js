/* eslint-disable */

const path = require('path')

const fromRoot = (d) => path.join(__dirname, d)
module.exports = {
  roots: [fromRoot('app'), fromRoot('tests')],
  resetMocks: true,
  // coveragePathIgnorePatterns: [],
  // collectCoverageFrom: ['**/app/**/*.{js,ts,tsx}'],
  // coverageThreshold: null,
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  globalSetup: './tests/database-setup.ts',
  setupFilesAfterEnv: ['@testing-library/jest-dom', './tests/jest-setup.ts'],
  moduleDirectories: ['node_modules', fromRoot('tests')],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '~/(.*)': fromRoot('app/$1'),
    'tests/(.*)': fromRoot('tests/$1'),
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
