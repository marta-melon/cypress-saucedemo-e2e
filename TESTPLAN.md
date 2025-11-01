# Cypress E2E – SauceDemo • Test Plan (English)

## 1. Purpose & Scope
End‑to‑end tests for the **SauceDemo** storefront (https://www.saucedemo.com). Covered flows: login/logout, product catalog, cart, checkout, and quality gates (a11y smoke, visual placeholder). The plan reflects the repository **as implemented after the fixes**.

**Out of scope:** payments (demo), external integrations, browser performance tests, API tests.

## 2. Test Environment & Browsers
- Environment: SauceDemo public demo.
- CI browsers: `electron`, `chrome` (GitHub Actions matrix).
- Node: 20.x, Cypress: 13.x.

## 3. Accounts / Data
- Default credentials: **`standard_user` / `secret_sauce`**.
- Negative scenario: **`locked_out_user` / `secret_sauce`**.
- Credentials can be overridden via `Cypress.env('USER_NAME')` / `Cypress.env('USER_PASS')` (fallback to the defaults above).

## 4. Inputs / Outputs
- Inputs: UI navigation and interactions, `data-test` selectors.
- Outputs: URL/text assertions and JUnit XML (in `results/`), screenshots and videos in default Cypress folders.

## 5. Acceptance Criteria
- Critical user flows (login, sorting, add to cart, checkout) **pass**.
- A11y smoke: no **critical** impact violations on the key pages.
- CI passes for all browsers in the matrix.

## 6. Scenario Coverage (mapping → .cy.js files)
### 6.1 Authentication
- **Login (happy path)** → `auth-login.cy.js` / `saucedemo-auth.cy.js`  
  Expected: after login, URL contains `/inventory.html`, page title “Products” is visible.
- **Login (negative – locked_out_user)** → `auth-login.cy.js` / `saucedemo-auth.cy.js`  
  Expected: error message containing “locked out”.
- **Logout** → `auth-logout.cy.js`  
  Expected: redirected back to the login page (`/`).

### 6.2 Catalog & Sorting
- **Sort by Price (low to high)** → `catalog-sorting.cy.js`  
  Expected: items sorted by ascending price.

### 6.3 Cart & Purchase
- **Checkout – happy path** → `checkout-happy-path.cy.js` and `saucedemo-cart-checkout.cy.js`  
  Steps: add an item → open cart → checkout step one → fill details → finish.  
  Expected: `checkout-complete.html` with “Thank you for your order!”.
- **Checkout – validations** → `checkout-validation.cy.js`  
  Expected: `firstName`, `lastName`, `postalCode` are required on step one.

### 6.4 Quality Gates
- **A11y smoke** → `accessibility-smoke.cy.js`, `quality-a11y.cy.js`  
  - Scope: login, inventory, cart, checkout step one.  
  - Axe rules: **only `critical`** impact.  
  - **Exception:** on the inventory page, rule `select-name` is disabled (known issue on the sorting `<select>`).  
  - Navigation via **UI** (login and clicks), no direct deep‑links to protected routes.
- **Visuals** → `quality-visual.cy.js` (placeholder/pending baseline).

## 7. Test Architecture / Helpers
Helpers are defined in `cypress/support/commands.js` and loaded in `cypress/support/e2e.js`:
- `cy.login(user='standard_user', pass='secret_sauce')`
- `cy.logout()`
- `cy.ensureOnInventory()` – ensures logged‑in state and the inventory screen
- `cy.openCart()` – opens the cart
- `cy.addAnyItem()` – adds the first visible product
- A11y integration: `cypress-axe` (`cy.injectAxe`, `cy.checkA11y`, `cy.configureAxe`)

## 8. Reporting & CI
- JUnit reports (`results/junit-[hash].xml`) uploaded as a GitHub Actions artifact.
- Workflow: `.github/workflows/cypress-matrix.yml` (electron + chrome).
- Retries depend on Cypress config (no explicit per‑spec retries by default).

## 9. Risks & Known Behaviors
- Deep‑linking to protected routes (`/inventory.html`, `/cart.html`, `/checkout-step-one.html`) may return 404 — navigate **through the UI**.
- A11y: `select-name` on the inventory page is disabled in the smoke. For a full audit, run all rules in a separate job.

## 10. Maintenance & Next Steps
- Consolidate duplicate specs (`auth-login` vs `saucedemo-auth`).
- Add visual snapshots (e.g., `cypress-image-snapshot`) and per‑browser baselines.
- Expand a11y beyond `critical` with narrow rule exceptions (after stabilizing).
