// E2E test – saucedemo
import { Sel } from '../../support/selectors.js';

describe('Checkout happy path', { tags: ['@smoke', '@critical', '@checkout'] }, () => {
  it('purchases a single item successfully', () => {
    cy.fixture('users').then(({ standard }) => cy.login(standard.username, standard.password));
    cy.visit('/inventory.html');

    const sku = 'sauce-labs-backpack';
    cy.addItem(sku);

    cy.get(Sel.inventory.cartIcon).click();
    cy.get(Sel.cart.items).should('have.length', 1);

    cy.fixture('checkout').then(({ valid }) => {
      cy.checkout(valid);
    });
  });
});
