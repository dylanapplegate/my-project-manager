export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useEsm: true,
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
