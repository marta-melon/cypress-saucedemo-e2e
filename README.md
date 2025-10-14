# Cypress E2E – SauceDemo

Production‑ready Cypress project for the **SauceDemo** storefront: authentication, product catalog, cart, checkout, and quality gates (a11y smoke, visual placeholder).

## Stack
- **Cypress 13.x**
- **Node 20.x**
- **cypress-axe** (a11y)
- GitHub Actions matrix: **electron**, **chrome**

## Getting started
```bash
npm ci           # install dependencies
npm test         # headless run (electron) + JUnit report
npm run open     # open Cypress runner (interactive)
```

### Credentials
Default credentials used by tests:
- `standard_user` / `secret_sauce`
- Negative case: `locked_out_user` / `secret_sauce`

You can override via env:
- locally: `cypress.env.json`
```json
{ "USER_NAME": "standard_user", "USER_PASS": "secret_sauce" }
```
- in CI (optional): GitHub Secrets `CYPRESS_USER_NAME`, `CYPRESS_USER_PASS`

The `cy.login` helper falls back to the defaults above, so CI works even without secrets.

## Project structure
```
cypress/
  e2e/
    accessibility-smoke.cy.js
    auth-login.cy.js
    auth-logout.cy.js
    catalog-sorting.cy.js
    checkout-happy-path.cy.js
    checkout-validation.cy.js
    quality-a11y.cy.js
    quality-visual.cy.js     # placeholder/pending
    saucedemo-auth.cy.js
    saucedemo-cart-checkout.cy.js
  support/
    e2e.js        # imports cypress-axe + ./commands
    commands.js   # cy.login, cy.logout, cy.ensureOnInventory, cy.openCart, cy.addAnyItem
.github/workflows/
  cypress-matrix.yml
```

## Scripts
```json
{
  "scripts": {
    "open": "cypress open",
    "test": "cypress run --headless --browser electron --reporter junit --reporter-options mochaFile=results/junit-[hash].xml,toConsole=true"
  },
  "devDependencies": {
    "cypress-axe": "^1.5.0"
  }
}
```

## A11y policy
- Smoke on key pages.
- Validate **`critical`** impact only.
- On the inventory page, disable Axe rule **`select-name`** (known false positive for the sorting `<select>`).
- Call order: **`cy.injectAxe()` before `cy.configureAxe()`**, then `cy.checkA11y(...)`.

## CI
Workflow `.github/workflows/cypress-matrix.yml`:
- installs deps (`npm ci`)
- runs `npx cypress run` for `electron` and `chrome`
- uploads JUnit XML as an artifact (`results/`)

## Troubleshooting
- **404 after `cy.visit('/inventory.html')`** → route is protected; use helpers (`cy.ensureOnInventory()`, `cy.openCart()`).
- **Axe: TypeError with `configureAxe`** → make sure `cy.injectAxe()` is called **before** `cy.configureAxe(...)`.
- **No secrets in forks** → helper has a fallback; tests run without secrets.

## License
Demo tests for educational purposes.
