/// <reference types="cypress" />

describe('SauceDemo - Authentication', () => {
  it('logs in and logs out as standard_user', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce', { log: false });
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.contains('.title', 'Products').should('be.visible');

    // logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();
    cy.url().should('include', '/');
  });

  it('shows error for locked_out_user', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce', { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'locked out');
  });
});
