// E2E test – saucedemo
// Basic visual regression on inventory list

describe('Visual regression', { tags: ['@visual', '@quality'] }, () => {
  it('inventory list stable layout', () => {
    cy.fixture('users').then(({ standard }) => cy.login(standard.username, standard.password));
    cy.viewport(1280, 720);
  cy.visit('/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    cy.wait(200);
  cy.matchImageSnapshot('inventory-list');
  });
});
