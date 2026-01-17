/// <reference types="cypress" />

import { Sel } from '../support/selectors.js';

const fillCustomerInfo = (firstName, lastName, postalCode) => {
  cy.get(Sel.checkout.firstName)
    .type(firstName);

  cy.get(Sel.checkout.lastName)
    .type(lastName);

  cy.get(Sel.checkout.postalCode)
    .type(postalCode);
}

describe('Checkout happy path', () => {

  beforeEach(() => {
    cy.login();
    cy.ensureOnInventory();
  });

  it('purchases a single item successfully', () => {
    cy.get(Sel.inventory
      .addToCart('sauce-labs-backpack'))
      .click();

    cy.openCart();
    cy.get('.cart_item')
      .should('have.length.at.least', 1);

    // Proceed to checkout
    cy.get(Sel.cart.checkout)
      .click();

    cy.url()
      .should('include', '/checkout-step-one.html');

    fillCustomerInfo('Marta', 'Test', '00-001');

    // Continue to the overview step
    cy.get(Sel.checkout.continue)
      .click();

    cy.url()
      .should('include', '/checkout-step-two.html');

    // Finish the checkout process
    cy.get(Sel.checkout.finish)
      .click();

    cy.url()
      .should('include', '/checkout-complete.html');

    // Final assertion – verify success message is visible
    cy.get(Sel.checkout.completeHeader)
      .should('contain.text', 'Thank you for your order!');
  });

  it('purchases multiple items successfully', () => {
    cy.get(Sel.inventory
      .addToCart('sauce-labs-backpack'))
      .click();

    cy.get(Sel.inventory
      .addToCart('sauce-labs-onesie'))
      .click();

    cy.openCart();
    cy.get('.cart_item')
      .should('have.length.at.least', 2);

    // Proceed to checkout
    cy.get(Sel.cart.checkout)
      .click();

    cy.url()
      .should('include', '/checkout-step-one.html');

    fillCustomerInfo('Marta', 'Test', '00-001');

    // Continue to the overview step
    cy.get(Sel.checkout.continue)
      .click();

    cy.url()
      .should('include', '/checkout-step-two.html');

    // Finish the checkout process
    cy.get(Sel.checkout.finish)
      .click();

    cy.url()
      .should('include', '/checkout-complete.html');

    // Final assertion – verify success message is visible
    cy.get(Sel.checkout.completeHeader)
      .should('contain.text', 'Thank you for your order!');
  });
});
