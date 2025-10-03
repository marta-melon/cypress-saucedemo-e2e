// Visual regression (auto-skips if snapshot command is unavailable)
const hasMIS = !!(Cypress.Commands && Cypress.Commands._commands && Cypress.Commands._commands['matchImageSnapshot']);

(hasMIS ? it : it.skip)('inventory list stable layout', () => {
  cy.login('standard_user', 'secret_sauce');
  cy.ensureOnInventory();
  // Stabilize before snapshot
  cy.get('.inventory_list').should('be.visible');
  cy.wait(250);
  cy.matchImageSnapshot('inventory-list');
});
