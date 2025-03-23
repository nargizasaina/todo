export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };