export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
  },
  moduleFileExtensions: ['js', 'json'], 
  globals: {
    'jest-environment-jsdom': {
      customExportConditions: ['node', 'node-addons'], 
    },
  },
};
