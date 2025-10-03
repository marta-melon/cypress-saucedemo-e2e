const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/*.cy.js',
    excludeSpecPattern: ['cypress/e2e/ref-*.cy.js'],
    setupNodeEvents(on, config) {
      // Keep Node-only plugins here. Do NOT import 'node:*' modules in browser code.
      return config;
    },
  },
});
