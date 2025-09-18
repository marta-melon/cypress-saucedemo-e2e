// E2E test – saucedemo
// Accessibility smoke using cypress-axe
import { Sel } from '../../support/selectors.js';

describe('A11y smoke', { tags: ['@a11y', '@quality'] }, () => {
  it('inventory page has no critical violations', () => {
    cy.fixture('users').then(({ standard }) => cy.login(standard.username, standard.password));
    cy.visit('/inventory.html');
    cy.injectAxe();
    cy.checkA11y(undefined, { includedImpacts: ['critical', 'serious'] });
  });
});
