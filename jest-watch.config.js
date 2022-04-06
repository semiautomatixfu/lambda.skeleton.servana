// eslint-disable-next-line no-undef
module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
