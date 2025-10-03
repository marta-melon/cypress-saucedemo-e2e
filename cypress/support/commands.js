// Custom reusable commands for SauceDemo + API tests.
// IMPORTANT: browser context only. Do NOT import 'fs', 'path' or any 'node:*' modules here.

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  // Always start from the login page to avoid deep-link 404s
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password, { log: false });
  cy.get('#login-button').click();
});

Cypress.Commands.add('loginExpectError', (username, password, expectedMessage) => {
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password, { log: false });
  cy.get('#login-button').click();
  cy.get('[data-test="error"], .error-message-container').should('contain.text', expectedMessage);
});

Cypress.Commands.add('ensureOnInventory', () => {
  // If not authenticated, log in first
  cy.url().then((url) => {
    if (!/inventory\.html/.test(url)) {
      // Attempt to detect we're on login
      cy.get('body').then(($body) => {
        if ($body.find('#login-button').length) {
          cy.login();
        }
      });
    }
  });
  // Inventory list as a reliable presence check
  cy.get('.inventory_list', { timeout: 20000 }).should('be.visible');
});

Cypress.Commands.add('logout', () => {
  cy.ensureOnInventory();
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link', { timeout: 10000 }).click();
  // Back to login page
  cy.url({ timeout: 20000 }).should('match', /\/(index\.html)?$/);
  cy.get('#login-button').should('be.visible');
});

Cypress.Commands.add('openCart', () => {
  cy.ensureOnInventory();
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');
});

// Helper: add first visible item to cart
Cypress.Commands.add('addFirstItemToCart', () => {
  cy.ensureOnInventory();
  cy.get('.inventory_item').first().within(() => {
    cy.get('button[data-test^="add-to-cart"]').click();
  });
});

// Expose a safe way to know if matchImageSnapshot is available (don't use non-existent Cypress.Commands.has)
Cypress.Commands.add('hasCommand', (name) => {
  const exists = !!(Cypress.Commands && Cypress.Commands._commands && Cypress.Commands._commands[name]);
  return cy.wrap(exists, { log: false });
});
