// cypress/support/commands.js
import 'cypress-axe';
import { Sel } from './selectors.js';


Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/'); // or: cy.visit('https://www.saucedemo.com/')
  cy.get(Sel.login.username, { timeout: 15000 }).clear().type(username);
  cy.get(Sel.login.password).clear().type(password, { log: false });
  cy.get(Sel.login.submit).click();
  cy.url().should('include', '/inventory.html');
});

/** Logs out via burger menu and verifies redirect to the login page. */
Cypress.Commands.add('logout', () => {
  cy.get(Sel.burger.menuBtn).click();
  cy.get(Sel.burger.logout).should('be.visible').click();
  cy.url().should('eq', Cypress.config('baseUrl') + "/");
});


Cypress.Commands.add('ensureOnInventory', () => {
  cy.location('pathname').then((p) => {
    if (!p.includes('/inventory.html')) {
      cy.login();
    }
  });
  cy.url().should('include', '/inventory.html');
  cy.contains('.title', 'Products').should('be.visible');
});

/** Adds the first visible product from the inventory list. */
Cypress.Commands.add('addAnyItem', () => {
  cy.get(Sel.inventory.item).first().within(() => {
    cy.contains('button', 'Add to cart').click();
  });
});

Cypress.Commands.add('openCart', () => {
  cy.get(Sel.inventory.cartIcon).click();
  cy.url().should('include', '/cart.html');
});
