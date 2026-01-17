// Accessibility smoke for SauceDemo using axe-core.
// Scope: login, inventory, and a minimal checkout path.
/// <reference types="cypress" />
import { Sel } from '../support/selectors.js';

describe('SauceDemo - Accessibility smoke', () => {
  it('Login has no critical violations', () => {
// Hit the base URL (configured in cypress.config) to load the login page
    cy.visit('/');
// Inject axe-core into the page so we can run accessibility checks
    cy.injectAxe();
// Run a11y assertions; keep it strict (critical only) for smoke
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
    });
  });

  it('Inventory has no critical violations (ignores known select-name on sorter)', () => {
// Make sure we’re authenticated and on /inventory before scanning
    cy.ensureOnInventory();
    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
      rules: {
// Known deviation: the sorter select lacks a name; ignore for smoke
        'select-name': { enabled: false },
      },
    });
  });

  it('Checkout flow has no critical violations', () => {
    cy.ensureOnInventory();
// Add at least one item so checkout flow is reachable
    cy.addAnyItem();
// Navigate into the cart to trigger checkout
    cy.openCart();
    cy.get(Sel.cart.checkout).click();

    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
    });
  });
});
