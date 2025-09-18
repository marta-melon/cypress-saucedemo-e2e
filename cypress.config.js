import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // place for reporters / tasks if needed
      return config
    },
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/junit-[hash].xml',
    toConsole: true,
  },
})
