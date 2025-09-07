export default {
  // Test environment
  testEnvironment: 'node',

  // Transform configuration for ES modules
  transform: {},

  // Coverage configuration (disabled - using c8 instead)
  collectCoverage: false,

  // Test patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Setup and teardown
  testTimeout: 10000,

  // Reporting
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Reset modules between tests
  resetModules: true
}
