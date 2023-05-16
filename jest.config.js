/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  transform: {
    "^.+\\.(js|ts)$": ["ts-jest", {
      tsconfig: './tsconfig.jest.json',
      useESM: true,
    }]
  },
  setupFilesAfterEnv: ['./src/jest.setup.js'],
  // roots: [
  //   '<rootDir>/src'
  // ],
  moduleNameMapper: {
    "@/(.*)": '<rootDir>/src/$1',
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
};