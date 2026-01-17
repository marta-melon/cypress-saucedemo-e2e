import { Sel } from './selectors.js';

/**
 * Log in using UI.
 *
 * Priority of credentials:
 * 1) Explicit function arguments (username, password)
 * 2) Cypress.env('USER_NAME' | 'USER_PASS') // auto-exposed from env vars prefixed with CYPRESS_
 * 3) Cypress.env('CYPRESS_USER_NAME' | 'CYPRESS_USER_PASS')  // direct read just in case
 * 4) Safe defaults for local runs (Swag Labs demo creds)
 *
 * This lets us keep CI secrets out of the codebase while still being able to run locally
 * without extra setup.
 */
Cypress.Commands.add('login', (username = null, password = null) => {
  const user =
    username ||
    Cypress.env('USER_NAME') ||
    Cypress.env('CYPRESS_USER_NAME') ||
    'standard_user';

  const pass =
    password ||
    Cypress.env('USER_PASS') ||
    Cypress.env('CYPRESS_USER_PASS') ||
    'secret_sauce';

  cy.visit('/');

  cy.get(Sel.login.username, { timeout: 15000 }).clear().type(user);
  cy.get(Sel.login.password).clear().type(pass, { log: false });
  cy.get(Sel.login.button).click();

  cy.url().should('include', '/inventory.html');
});

/**
 * Log out via the burger menu and verify we are back at the login page.
 * We compare against an exact URL resolved from baseUrl to avoid flakiness.
 */
Cypress.Commands.add('logout', () => {
  cy.get(Sel.menu.button).click();
  cy.get(Sel.menu.logout).should('be.visible').click();

  const base = Cypress.config('baseUrl');
  expect(base, 'Set baseUrl in cypress.config.*').to.be.a('string').and.not.be.empty;
  const expectedLoginUrl = new URL('/', base).toString();

  cy.url().should('eq', expectedLoginUrl);
});

/**
 * Get credentials for user that is locked out
 * Priority of credentials:
 * 1) Cypress.env('USER_NAME' | 'USER_PASS') // auto-exposed from env vars prefixed with CYPRESS_
 * 2) Cypress.env('CYPRESS_USER_NAME' | 'CYPRESS_USER_PASS')  // direct read just in case
 * 3) Safe defaults for local runs (Swag Labs demo creds)
 */
Cypress.Commands.add('getLockedOutUser', () => {
  const user =
    Cypress.env('LOCKED_USER_NAME') ||
    Cypress.env('CYPRESS_LOCKED_USER_NAME');

  const pass =
    Cypress.env('LOCKED_USER_PASS') ||
    Cypress.env('CYPRESS_LOCKED_USER_PASS');

  const creds = { user: user, password: pass };

  return cy.wrap(creds);
})

/**
 * Ensure we are on the Inventory page.
 * If not, perform login first. Safe to call multiple times.
 */
Cypress.Commands.add('ensureOnInventory', () => {
  cy.location('pathname').then((p) => {
    if (!p.includes('/inventory.html')) {
      cy.login();
    }
  });

  cy.url()
    .should('include', '/inventory.html');

  cy.contains('.title', 'Products')
    .should('be.visible');
});

/**
 * Add the first visible product from the inventory list.
 * This is intentionally simple and not tied to a specific product name.
 */
Cypress.Commands.add('addAnyItem', () => {
  cy.get(Sel.inventory.item)
    .first()
    .within(() => {
      cy.contains('button', 'Add to cart')
        .click();
    });
});

/**
 * Open the cart page from the header icon and verify the URL.
 */
Cypress.Commands.add('openCart', () => {
  cy.get(Sel.inventory.cartIcon)
    .click();

  cy.url()
    .should('include', '/cart.html');
});
