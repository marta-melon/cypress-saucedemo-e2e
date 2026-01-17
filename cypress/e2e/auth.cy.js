// / <reference types="cypress" />
import { Sel } from '../support/selectors.js';

describe('SauceDemo - Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('logs in as standard_user', () => {
    cy.login();

    // Verify we landed on the inventory page
    cy.url()
      .should('include', '/inventory.html');

    cy.contains('.title', 'Products')
      .should('be.visible');

    cy.get(Sel.inventory.item)
      .should('have.length.greaterThan', 0);
  });

  it('logs out via burger menu', () => {
    cy.login();
    cy.ensureOnInventory();

    // Open the burger menu and log out
    cy.get(Sel.menu.button)
      .click();

    cy.get(Sel.menu.logout)
      .should('be.visible').click();

    // Verify we’re back on the login page
    cy.url()
      .should('eq', Cypress.config().baseUrl + '/')

    cy.get(Sel.login.button)
      .should('be.visible');
  });

  it('shows an error for locked_out_user', () => {
    cy.getLockedOutUser().then(({ user, password }) => {
      cy.get(Sel.login.username, { timeout: 15000 })
        .clear()
        .type(user);

      cy.get(Sel.login.password)
        .clear()
        .type(password, { log: false });

      cy.get(Sel.login.button)
        .click();
    });

    // Expect an error message about locked account
    cy.get(Sel.login.error)
      .should('be.visible')
      .and('contain.text', 'locked out');
  });
});
