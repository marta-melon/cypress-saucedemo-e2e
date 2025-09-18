# Cypress Saucedemo E2E Tests

This project tests the demo web app **saucedemo.com** with Cypress 13 and JavaScript.

## Tests
- `auth-login.cy.js` – login variations
- `auth-logout.cy.js` – menu logout
- `catalog-sorting.cy.js` – sort and filter inventory
- `checkout-happy-path.cy.js` – full checkout flow
- `checkout-validation.cy.js` – form validation
- `quality-a11y.cy.js` – basic WCAG checks
- `quality-visual.cy.js` – snapshot smoke

## Install
```bash
npm install
npx cypress verify
```
...
Headless:
```bash
npm test
```

## CI
GitHub Actions runs tests on Ubuntu. It uses matrix (Electron + Chrome) and shards.

Flow:
```
push -> matrix -> shard -> run -> artifacts
```

JUnit XML is saved to `results/`. Visual baselines live under `cypress/snapshots`. A11y uses `cypress-axe`.