// E2E test – saucedemo
// / <reference types="cypress" />
import { Sel } from '../support/selectors.js';

describe('Login', { tags: ['@smoke', '@auth'] }, () => {
  beforeEach(() => cy.visit('/'));

  it('logs in as standard_user (happy path)', () => {
    cy.fixture('users').then(({ standard }) => {
      cy.get(Sel.login.username).type(standard.username);
      cy.get(Sel.login.password).type(standard.password, { log: false });
      cy.get(Sel.login.submit).click();
      cy.url().should('include', '/inventory.html');
      cy.get(Sel.inventory.item).should('have.length.greaterThan', 0);
    });
  });

  it('shows error for locked_out_user (negative)', () => {
    cy.fixture('users').then(({ locked }) => {
      cy.get(Sel.login.username).type(locked.username);
      cy.get(Sel.login.password).type(locked.password, { log: false });
      cy.get(Sel.login.submit).click();
      cy.get(Sel.login.error).should('contain.text', 'locked out');
    });
  });
});
