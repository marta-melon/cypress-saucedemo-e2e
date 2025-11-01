// Catalog sorting: verifies that 'Price (low to high)' sorts numerically ascending.
// Note: relies on visible price labels; avoids magic delays.
// cypress/e2e/catalog-sorting.cy.js
// Quick sanity check for product sorting on the inventory page.
// The goal: verify that sorting by "Price (low to high)" actually sorts numerically.

describe('Catalog sorting', () => {
  it('sorts by Price (low to high)', () => {
    // Log in through the UI — safer than bypassing login, ensures session/cookies are fresh
    cy.login('standard_user', 'secret_sauce');

    // Make sure we actually landed on the inventory page before proceeding
    cy.url().should('include', '/inventory');

    // Open the sorting dropdown and pick "Price (low to high)"
    // (uses the option's value attribute — 'lohi')
    cy.get('[data-test="product-sort-container"]')
      .should('be.visible')
// Pick 'Price (low to high)' by the option value
      .select('lohi');

    // Grab all visible prices, parse them to numbers (remove $ and whitespace)
    // Then compare the current order with a numerically sorted copy.
    // If they're equal, sorting works as expected.
    cy.get('.inventory_item_price').then(($prices) => {
// Normalize price strings → numeric values for a real numeric sort check
      const nums = Array.from($prices, el =>
        Number(el.innerText.replace('$', '').trim())
      );
      const sorted = [...nums].sort((a, b) => a - b);

      // Verify that the order of displayed prices matches the ascending sort
      expect(nums, 'prices are sorted low→high').to.deep.equal(sorted);
    });
  });
});
