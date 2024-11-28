export default {
  testEnvironment: 'jsdom', // Simulate a browser-like environment
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest', // Use Babel to transpile ES6+ syntax
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest.mock.js', // Mock CSS/SCSS files
    '^@/(.*)$': '<rootDir>/src/$1', // Map '@' alias to the 'src' folder
  },
  transformIgnorePatterns: [
    'node_modules/(?!(some-esm-package|another-esm-package)/)', // Optional: Transpile ESM packages
  ],
};
