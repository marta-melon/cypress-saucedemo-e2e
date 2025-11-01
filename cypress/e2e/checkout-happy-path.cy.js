// Checkout happy path: minimal flow from add-to-cart to successful order.
// Selectors come from Sel for maintainability.
// cypress/e2e/checkout-happy-path.cy.js
// Full end-to-end happy path: login → add item → checkout → verify success.
// Using centralized selectors from Sel for consistency and maintainability.

import { Sel } from '../support/selectors.js';

describe('Checkout happy path', () => {
  it('purchases a single item successfully', () => {
    // Log in as a standard user to start the flow
    cy.login('standard_user', 'secret_sauce');

    // Double-check we’re on the inventory page before interacting with items
    cy.ensureOnInventory();

    // Add the backpack to cart (using stable selector from Sel)
    cy.get(Sel.inventory.addToCart('sauce-labs-backpack')).click();

    // Open the cart view
    cy.openCart();

    // Proceed to checkout
    cy.get(Sel.cart.checkout).click();
    cy.url().should('include', '/checkout-step-one.html');

    // Fill out customer info
    cy.get(Sel.checkout.firstName).type('Marta');
    cy.get(Sel.checkout.lastName).type('Test');
    cy.get(Sel.checkout.postalCode).type('00-001');

    // Continue to the overview step
    cy.get(Sel.checkout.continue).click();
    cy.url().should('include', '/checkout-step-two.html');

    // Finish the checkout process
    cy.get(Sel.checkout.finish).click();
    cy.url().should('include', '/checkout-complete.html');

    // Final assertion – verify success message is visible
    cy.get(Sel.checkout.completeHeader)
      .should('contain.text', 'Thank you for your order!');
  });
});