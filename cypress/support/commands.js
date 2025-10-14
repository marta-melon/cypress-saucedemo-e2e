import 'cypress-axe';

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password, { log: false });
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
});

Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.url().should('match', /https:\/\/www\.saucedemo\.com\/?$/);
});

Cypress.Commands.add('ensureOnInventory', () => {
  cy.login();
  cy.url().should('include', '/inventory.html');
  cy.contains('.title', 'Products').should('be.visible');
});

Cypress.Commands.add('addAnyItem', () => {
  cy.get('.inventory_item').first().within(() => {
    cy.contains('Add to cart').click();
  });
});

// NEW: openCart helper used by your existing specs
Cypress.Commands.add('openCart', () => {
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');
});
