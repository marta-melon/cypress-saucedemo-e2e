import { Sel } from '../support/selectors.js';

const priceToNum = (s) => Number(String(s).replace(/[^\d.]/g, ''));

describe('Catalog sorting', () => {

  beforeEach(() => {
    cy.login();
    cy.ensureOnInventory();
  });

  it('sorts by Price (low to high)', () => {
    cy.get(Sel.inventory.sort)
      .should('be.visible')
      .select('lohi');

    cy.get('.inventory_item_price')
      .then(($prices) => {

        const nums = Array.from($prices, el =>
          priceToNum(el.innerText)
        );

        const sorted = [...nums].sort((a, b) => a - b);

        expect(nums, 'prices are sorted low→high')
          .to.deep.equal(sorted);
      });
  });

  it('sorts by Price (high to low)', () => {
    cy.get(Sel.inventory.sort)
      .should('be.visible')
      .select('hilo');

    cy.get('.inventory_item_price')
      .then(($prices) => {

        const nums = Array.from($prices, el =>
          priceToNum(el.innerText)
        );

        const sorted = [...nums].sort((a, b) => b - a);

        expect(nums, 'prices are sorted high→low')
          .to.deep.equal(sorted);
      });
  });

  it('sorts by Name (A - Z)', () => {
    cy.get(Sel.inventory.sort)
      .should('be.visible')
      .select('az');

    cy.get('.inventory_item_name')
      .then(($names) => {
        const names = Array.from($names, el => el.innerText);
        const sorted = [...names].sort();

        expect(names, 'names are sorted A→Z')
          .to.deep.equal(sorted);
      });
  });

  it('sorts by Name (Z - A)', () => {
    cy.get(Sel.inventory.sort)
      .should('be.visible')
      .select('za');

    cy.get('.inventory_item_name')
      .then(($names) => {
        const names = Array.from($names, el => el.innerText);
        const sorted = [...names].sort()
          .reverse();

        expect(names, 'names are sorted Z→A')
          .to.deep.equal(sorted);
      });
  });
});
