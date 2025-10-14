/// <reference types="cypress" />

function login() {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce', { log: false });
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
}

describe('SauceDemo - Cart & Checkout', () => {
  it('adds two items and completes checkout', () => {
    login();
    // Add first two visible items
    cy.get('.inventory_item').eq(0).within(() => {
      cy.contains('Add to cart').click();
    });
    cy.get('.inventory_item').eq(1).within(() => {
      cy.contains('Add to cart').click();
    });

    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length.at.least', 2);

    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    cy.get('[data-test="firstName"]').type('Ada');
    cy.get('[data-test="lastName"]').type('Lovelace');
    cy.get('[data-test="postalCode"]').type('10101');
    cy.get('[data-test="continue"]').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="finish"]').click();

    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Thank you for your order!').should('be.visible');
  });
});
