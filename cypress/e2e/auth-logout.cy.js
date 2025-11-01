// Logout smoke: verifies our custom cy.logout() returns to the login page.
// Guards against regressions in the burger menu / logout link behavior.
// cypress/e2e/saucedemo/auth-logout.cy.js
// Simple smoke test for logout flow.
// Verifies that the logout command actually returns to the login page.

import { Sel } from '../support/selectors.js';

describe('Logout', () => {
  it('logs out via burger menu', () => {
    // Precondition: user must be logged in and on the inventory page
    cy.login('standard_user', 'secret_sauce');
// Hard assert we are on inventory before logging out
    cy.ensureOnInventory();

    // Trigger logout (defined in support/commands.js)
    cy.logout();

    // Check that the URL redirects back to login page
    cy.url().should('eq', 'https://www.saucedemo.com/');

    // Optional sanity check: login button should be visible again
    cy.get(Sel.login.button).should('be.visible');
  });
});
