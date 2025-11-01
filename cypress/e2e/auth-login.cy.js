// Auth: login happy path and a locked-out negative scenario.
// Keep it fast and deterministic; credentials live in fixtures.
// E2E test – saucedemo
// / <reference types="cypress" />
import { Sel } from '../support/selectors.js';

describe('Login', { tags: ['@smoke', '@auth'] }, () => {
// Start every test from the login page
  beforeEach(() => cy.visit('/'));

  it('logs in as standard_user (happy path)', () => {
// Read test users from fixtures/users.json
    cy.fixture('users').then(({ standard }) => {
// Type the username into the login form
      cy.get(Sel.login.username).type(standard.username);
// Type the password (hidden from logs)
      cy.get(Sel.login.password).type(standard.password, { log: false });
// Submit the form and expect to land on the inventory
      cy.get(Sel.login.submit).click();
      cy.url().should('include', '/inventory.html');
// Sanity check: inventory should list at least one item
      cy.get(Sel.inventory.item).should('have.length.greaterThan', 0);
    });
  });

  it('shows error for locked_out_user (negative)', () => {
    cy.fixture('users').then(({ locked }) => {
      cy.get(Sel.login.username).type(locked.username);
      cy.get(Sel.login.password).type(locked.password, { log: false });
      cy.get(Sel.login.submit).click();
// Verify the application shows a clear auth error
      cy.get(Sel.login.error).should('contain.text', 'locked out');
    });
  });
});
