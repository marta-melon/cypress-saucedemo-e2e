// cypress/e2e/catalog-sorting.cy.js
// Fix: correct selector [data-test="product-sort-container"] (hyphen, not underscore)
// and assert sorting by computing prices numerically.
describe('Catalog sorting', () => {
  it('sorts by Price (low to high)', () => {
    // Login through UI for stability
    cy.login('standard_user', 'secret_sauce');

    // We should end up on /inventory
    cy.url().should('include', '/inventory');

    // Select "Price (low to high)"
    cy.get('[data-test="product-sort-container"]')
      .should('be.visible')
      .select('lohi'); // value attribute on the option

    // Assert prices are sorted ascending
    cy.get('.inventory_item_price').then(($prices) => {
      const nums = Array.from($prices, el => Number(el.innerText.replace('$','').trim()));
      const sorted = [...nums].sort((a, b) => a - b);
      expect(nums, 'prices are sorted low→high').to.deep.equal(sorted);
    });
  });
});
