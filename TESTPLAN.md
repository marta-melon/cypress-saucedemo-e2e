# Test Plan – Saucedemo

## Scope
- Login/Logout – positive & negative.
- Catalog – sorting, add/remove items.
- Checkout – happy path & validation errors.
- A11y – WCAG critical/serious issues.
- Visual – smoke snapshots of key pages.

## Stability
- Each run starts with fresh session (cy.session).
- Retries: 2x runMode.
- No fixed sleeps.
