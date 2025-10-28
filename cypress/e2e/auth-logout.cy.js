describe('Logout', () => {
  it('logs out via burger menu', () => {
cy.ensureOnInventory();
    cy.logout();
  });
});
