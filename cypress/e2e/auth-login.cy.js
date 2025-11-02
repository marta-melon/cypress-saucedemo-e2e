// Auth: login happy path and a locked-out negative scenario.
// Keep it fast and deterministic; credentials live in env vars or local env file.
// E2E test – saucedemo
// / <reference types="cypress" />
import { Sel } from '../support/selectors.js';

describe('Login', { tags: ['@smoke', '@auth'] }, () => {
  // Start every test from the login page
  beforeEach(() => cy.visit('/'));

  it('logs in as standard_user (happy path)', () => {
    // Read test users from environment variables or local env file
    const user =
      Cypress.env('USER_NAME') ||
      Cypress.env('CYPRESS_USER_NAME') ||
      'standard_user';
    const pass =
      Cypress.env('USER_PASS') ||
      Cypress.env('CYPRESS_USER_PASS') ||
      'secret_sauce';

    // Type the username into the login form
    cy.get(Sel.login.username).type(user);
    // Type the password (hidden from logs)
    cy.get(Sel.login.password).type(pass, { log: false });
    // Submit the form and expect to land on the inventory
    cy.get(Sel.login.submit).click();
    cy.url().should('include', '/inventory.html');
    // Sanity check: inventory should list at least one item
    cy.get(Sel.inventory.item).should('have.length.greaterThan', 0);
  });

  it('shows error for locked_out_user (negative)', () => {
    // Read locked user credentials from secrets or env file
    const user =
      Cypress.env('LOCKED_USER_NAME') ||
      Cypress.env('CYPRESS_LOCKED_USER_NAME') ||
      'locked_out_user';
    const pass =
      Cypress.env('LOCKED_USER_PASS') ||
      Cypress.env('CYPRESS_LOCKED_USER_PASS') ||
      'secret_sauce';

    cy.get(Sel.login.username).type(user);
    cy.get(Sel.login.password).type(pass, { log: false });
    cy.get(Sel.login.submit).click();
    // Verify the application shows a clear auth error
    cy.get(Sel.login.error).should('contain.text', 'locked out');
  });
});
