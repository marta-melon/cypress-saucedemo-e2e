const { defineConfig } = require('cypress');
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/*.cy.js',
    setupNodeEvents(on, config) {

      addMatchImageSnapshotPlugin(on);

      return config;
    }
  },
});
