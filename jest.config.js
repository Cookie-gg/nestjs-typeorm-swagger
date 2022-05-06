/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
