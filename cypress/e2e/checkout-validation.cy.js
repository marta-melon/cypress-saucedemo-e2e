// E2E test – saucedemo
import { Sel } from '../../support/selectors.js';

describe('Checkout validation', { tags: ['@regression', '@checkout'] }, () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standard }) => cy.login(standard.username, standard.password));
    cy.visit('/cart.html');
  });

  it('requires first name, last name and postal code', () => {
    cy.get(Sel.cart.checkout).click();
    cy.get(Sel.checkout.continue).click();
    cy.get('.error-message-container').should('contain.text', 'First Name is required');
    cy.get(Sel.checkout.firstName).type('Jane');
    cy.get(Sel.checkout.continue).click();
    cy.get('.error-message-container').should('contain.text', 'Last Name is required');
  });
});
