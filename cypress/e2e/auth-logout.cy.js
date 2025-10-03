describe('Logout', () => {
  it('logs out via burger menu', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.ensureOnInventory();
    cy.logout();
  });
});
