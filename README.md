# Cypress E2E – SauceDemo

Production‑ready Cypress project that exercises the **SauceDemo** storefront end‑to‑end: authentication, product catalog, cart, checkout and regression quality gates (a11y, visual, basic security, SLA probes).

## Highlights
- **Realistic user flows**: login/logout, sort & filter catalog, add/remove items, checkout (validations & happy path).
- **Quality gates**: axe‑core accessibility checks, lightweight visual checks, negative scenarios and security sanity.
- **Operational signals**: simple **SLA probes** for key endpoints to spot regressions over time.
- **Stable runs**: no fixed sleeps, idempotent data, retries enabled, selectors isolated in `/support`.

## Project structure
```
cypress/
  e2e/                 # spec files (auth, catalog, checkout, quality, security, sla)
  fixtures/            # users, test data
  support/             # commands, selectors, hooks
cypress.config.js
package.json
```
Key specs: `auth-login.cy.js`, `auth-logout.cy.js`, `catalog-sorting.cy.js`, `checkout-happy-path.cy.js`, `checkout-validation.cy.js`, `quality-a11y.cy.js`, `quality-visual.cy.js`, `security-sanity.cy.js`, `sla-metrics.cy.js`.

## Getting started
```bash
npm ci
npm test            # run headless
npm run open        # interactive runner
```

### Config & environments
- Base URL set in `cypress.config.js` (SauceDemo). Override with `CYPRESS_baseUrl=https://… npm test`.
- Secrets (e.g. credentials) loaded from fixtures or env (`CYPRESS_…`). Avoid committing real secrets.

### Running in CI
- `npm test` for headless runs; artifacts (screenshots/videos) enabled on failure.
- JUnit/JSON reports can be exported from Cypress results folder and uploaded to CI.

## Coding standards
- ESLint enforced; PRs must be green.
- Test **tags** (`@smoke`, `@auth`, `@checkout`) allow selective runs: `--env grepTags=@smoke` (with cypress-grep if configured).

## What these tests prove
- Critical E2E path to buy a product works on every build.
- **Guardrails** catch common regressions: broken auth/session, UI accessibility, accidental UI changes, insecure headers.
- **SLA probe** surfaces slowdowns before they hit users.
