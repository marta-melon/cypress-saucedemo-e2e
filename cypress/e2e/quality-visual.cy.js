// Visual regression (auto-skips if snapshot command is unavailable)

const snapshotTest = (name, func) => {
  it(name, () => {
    try {
      func();
    } catch (e) {
      if (e.message.includes('matchImageSnapshot')) {
        cy.log('Plugin missing - test skipped');
      } else {
        throw e;
      }
    }
  });
};

describe('Image snapshot tests', () => {

  snapshotTest('inventory list stable layout', () => {
    cy.ensureOnInventory();

    cy.get('.inventory_list')
      .should('be.visible');

    // Tiny settle time to reduce layout jitter in CI
    cy.wait(250);

    cy.matchImageSnapshot('inventory-list');
  });

});
