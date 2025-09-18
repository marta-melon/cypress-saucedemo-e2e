// E2E test – saucedemo
describe('Logout', { tags: ['@regression', '@auth'] }, () => {
  it('logs out via burger menu', () => {
    cy.fixture('users').then(({ standard }) => {
      cy.login(standard.username, standard.password);
      cy.visit('/inventory.html');
      cy.logout();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });
  });
});
