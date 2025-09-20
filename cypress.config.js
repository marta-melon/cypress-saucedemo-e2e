// Safe optional load for cypress-image-snapshot
try { require('cypress-image-snapshot/command') } catch(e) { console.warn('cypress-image-snapshot not loaded:', e?.message || e) }
import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on)
      return config
    },
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/junit-[hash].xml',
    toConsole: true,
  },
})
