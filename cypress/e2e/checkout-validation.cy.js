import { Sel } from '../support/selectors.js';

describe('Checkout form validation', () => {

  beforeEach(() => {
    cy.login();
    cy.ensureOnInventory();

    cy.get(Sel.inventory.addToCart('sauce-labs-backpack'))
      .click();

    cy.openCart();

    cy.get(Sel.cart.checkout)
      .click();

    cy.url()
      .should('include', '/checkout-step-one.html');
  });

  it('shows an error when required fields are missing', () => {
    cy.get(Sel.checkout.continue)
      .click();

    // Expect an error banner — this is the main validation guard
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });

  it('shows an error when last name is missing', () => {

    // Fill in only the first name and try to continue
    cy.get(Sel.checkout.firstName)
      .type('Marta');

    cy.get(Sel.checkout.continue)
      .click();

    // App should block progress and display last name validation message
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: Last Name is required');
  });

  it('shows an error when postal code is missing', () => {

    // Fill in data and try to continue
    cy.get(Sel.checkout.firstName)
      .type('Marta');

    cy.get(Sel.checkout.lastName)
      .type('Test');

    cy.get(Sel.checkout.continue)
      .click();

    // Postal code is required to move forward
    cy.get(Sel.checkout.error)
      .should('be.visible')
      .and('contain.text', 'Error: Postal Code is required');
  });

  it('proceeds when all required fields are filled', () => {

    // Fill out all fields properly
    cy.get(Sel.checkout.firstName)
      .type('Marta');

    cy.get(Sel.checkout.lastName)
      .type('Test');

    cy.get(Sel.checkout.postalCode)
      .type('00-001');

    cy.get(Sel.checkout.continue)
      .click();

    // Should move to step two without errors
    cy.url()
      .should('include', '/checkout-step-two.html');
  });
});
