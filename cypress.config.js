const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BOOKER_BASE_URL || 'https://restful-booker.herokuapp.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
      return config;
    },
  },
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  defaultCommandTimeout: 8000,
  requestTimeout: 15000,
});
