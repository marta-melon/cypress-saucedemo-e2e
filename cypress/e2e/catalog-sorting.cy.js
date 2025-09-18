// E2E test – saucedemo
import { Sel } from '../../support/selectors.js';

describe('Catalog sorting', { tags: ['@regression', '@catalog'] }, () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standard }) => cy.login(standard.username, standard.password));
    cy.visit('/inventory.html');
  });

  it('sorts by Price (low to high)', () => {
    cy.get(Sel.inventory.sort).select('lohi');
    const getPrices = () => cy.get('.inventory_item_price').then(($els) => $els.toArray().map((el) => parseFloat(el.innerText.replace('$', ''))));
    getPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices, 'prices are sorted ascending').to.deep.equal(sorted);
    });
  });
});
