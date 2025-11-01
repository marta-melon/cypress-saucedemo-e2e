// Checkout validation: exercises required field guards on step one.
// Each test isolates a single missing field for crisp failure feedback.
// cypress/e2e/checkout-validation.cy.js
// Validation scenarios for checkout form — making sure required fields behave as expected.

import { Sel } from '../support/selectors.js';

describe('Checkout form validation', () => {
// Arrange: log in, add an item, and land on checkout step one for each case
  beforeEach(() => {
    // Standard login flow to reach inventory page
    cy.login('standard_user', 'secret_sauce');
    cy.ensureOnInventory();

    // Add an item and go to checkout
    cy.get(Sel.inventory.addToCart('sauce-labs-backpack')).click();
    cy.openCart();
    cy.get(Sel.cart.checkout).click();

    // Confirm we’re at step one of the checkout process
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('shows an error when required fields are missing', () => {
    // Try to continue without filling out any fields
    cy.get(Sel.checkout.continue).click();

    // Expect an error banner — this is the main validation guard
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });

  it('shows an error when last name is missing', () => {
    // Fill in only the first name and try to continue
    cy.get(Sel.checkout.firstName).type('Marta');
    cy.get(Sel.checkout.continue).click();

    // App should block progress and display last name validation message
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: Last Name is required');
  });

  it('shows an error when postal code is missing', () => {
    // Fill in first and last name, skip postal code
    cy.get(Sel.checkout.firstName).type('Marta');
// Now provide last name; postal code left blank
    cy.get(Sel.checkout.lastName).type('Test');
    cy.get(Sel.checkout.continue).click();

    // Postal code is required to move forward
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: Postal Code is required');
  });

  it('proceeds when all required fields are filled', () => {
    // Fill out all fields properly
    cy.get(Sel.checkout.firstName).type('Marta');
    cy.get(Sel.checkout.lastName).type('Test');
    cy.get(Sel.checkout.postalCode).type('00-001');
    cy.get(Sel.checkout.continue).click();

    // Should move to step two without errors
    cy.url().should('include', '/checkout-step-two.html');
  });
});