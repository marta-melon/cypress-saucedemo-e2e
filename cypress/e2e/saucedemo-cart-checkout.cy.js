// Cart + checkout scenario adding two items and completing the order.
// This spec uses direct DOM queries; kept as-is but documented for clarity.
/// <reference types="cypress" />

// Inline helper to log in through the UI
function login() {
// Hit the login page with absolute URL
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type('standard_user');
  cy.get('[data-test="password"]').type('secret_sauce', { log: false });
  cy.get('[data-test="login-button"]').click();
// Verify login success before proceeding
  cy.url().should('include', '/inventory.html');
}

describe('SauceDemo - Cart & Checkout', () => {
  it('adds two items and completes checkout', () => {
    login();
    // Add first two visible items
    cy.get('.inventory_item').eq(0).within(() => {
      cy.contains('Add to cart').click();
    });
// Add the second visible item to cart
    cy.get('.inventory_item').eq(1).within(() => {
      cy.contains('Add to cart').click();
    });

// Open the cart to review selected items
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
// We should have at least two items in the cart
    cy.get('.cart_item').should('have.length.at.least', 2);

// Begin checkout flow
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

// Fill required shipping fields
    cy.get('[data-test="firstName"]').type('Ada');
    cy.get('[data-test="lastName"]').type('Lovelace');
    cy.get('[data-test="postalCode"]').type('10101');
// Advance to the overview step
    cy.get('[data-test="continue"]').click();

    cy.url().should('include', '/checkout-step-two.html');
// Place the order
    cy.get('[data-test="finish"]').click();

    cy.url().should('include', '/checkout-complete.html');
// Success message confirms order completion
    cy.contains('Thank you for your order!').should('be.visible');
  });
});
