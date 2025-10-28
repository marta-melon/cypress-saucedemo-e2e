// cypress/support/commands.js
import 'cypress-axe';
import { Sel } from './selectors.js';

/**
 * Login from the login page.
 * Requires baseUrl in cypress.config.* (e.g. https://www.saucedemo.com)
 */
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/'); // baseUrl + '/'
  cy.get(Sel.login.username, { timeout: 15000 }).clear().type(username);
  cy.get(Sel.login.password).clear().type(password, { log: false });
  cy.get(Sel.login.submit).click();
  cy.url().should('include', '/inventory.html');
});

/** Logout via burger menu and verify redirect to the login page (exact URL). */
Cypress.Commands.add('logout', () => {
  cy.get(Sel.burger.menuBtn).click();
  cy.get(Sel.burger.logout).should('be.visible').click();
  const base = Cypress.config('baseUrl');
  expect(base, 'Set baseUrl in cypress.config.*').to.be.a('string').and.not.be.empty;
  const expectedLoginUrl = new URL('/', base).toString();
  cy.url().should('eq', expectedLoginUrl);
});

/**
 * Ensure we are on the Inventory page.
 * If not, perform login first (idempotent).
 */
Cypress.Commands.add('ensureOnInventory', () => {
  cy.location('pathname').then((p) => {
    if (!p.includes('/inventory.html')) {
      cy.login();
    }
  });
  cy.url().should('include', '/inventory.html');
  cy.contains('.title', 'Products').should('be.visible');
});

/** Add the first visible product from the inventory list. */
Cypress.Commands.add('addAnyItem', () => {
  cy.get(Sel.inventory.item).first().within(() => {
    cy.contains('button', 'Add to cart').click();
  });
});

/** Open the cart page from the header icon and verify the URL. */
Cypress.Commands.add('openCart', () => {
  cy.get(Sel.inventory.cartIcon).click();
  cy.url().should('include', '/cart.html');
});
