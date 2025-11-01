// Visual regression smoke for inventory layout (optional).
// Auto-skips if the image snapshot command is not registered.
// Visual regression (auto-skips if snapshot command is unavailable)
const hasMIS = !!(Cypress.Commands && Cypress.Commands._commands && Cypress.Commands._commands['matchImageSnapshot']);

(hasMIS ? it : it.skip)('inventory list stable layout', () => {
// Get to a stable inventory state before taking a snapshot
cy.ensureOnInventory();
  // Stabilize before snapshot
  cy.get('.inventory_list').should('be.visible');
// Tiny settle time to reduce layout jitter in CI
  cy.wait(250);
// Take a baseline/compare snapshot named 'inventory-list'
  cy.matchImageSnapshot('inventory-list');
});
