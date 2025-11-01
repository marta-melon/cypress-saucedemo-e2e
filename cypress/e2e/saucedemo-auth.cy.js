// Auth flows on SauceDemo: happy path + locked out user.
// Keep assertions minimal and meaningful to avoid flakiness.
/// <reference types="cypress" />
// Basic authentication flow tests for SauceDemo.
// Covers login success (standard_user) and login failure (locked_out_user).
// Using centralized selectors (Sel) for consistency and easier maintenance.

import { Sel } from '../support/selectors.js';

describe('SauceDemo - Authentication', () => {
  it('logs in and logs out as standard_user', () => {
    // Go directly to the SauceDemo login page (absolute URL for clarity)
    cy.visit('https://www.saucedemo.com/');

    // Enter valid credentials and log in
    cy.get(Sel.login.username).type('standard_user');
// Type password (hidden from logs)
    cy.get(Sel.login.password).type('secret_sauce', { log: false });
// Submit the login form
    cy.get(Sel.login.button).click();

    // Verify we landed on the inventory page
    cy.url().should('include', '/inventory.html');
// Basic sanity check that inventory loaded
    cy.contains('.title', 'Products').should('be.visible');

    // Open the burger menu and log out
    cy.get(Sel.menu.button).click();
// Click logout and expect redirect
    cy.get(Sel.menu.logout).should('be.visible').click();

    // Verify we’re back on the login page
    cy.url().should('include', '/');
  });

  it('shows an error for locked_out_user', () => {
    // Visit login page again (absolute path for consistency)
    cy.visit('https://www.saucedemo.com/');

    // Try to log in with a locked-out user
    cy.get(Sel.login.username).type('locked_out_user');
    cy.get(Sel.login.password).type('secret_sauce', { log: false });
    cy.get(Sel.login.button).click();

    // Expect an error message about locked account
    cy.get(Sel.login.error)
      .should('be.visible')
      .and('contain.text', 'locked out');
  });
});