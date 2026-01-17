// Accessibility smoke for SauceDemo using axe-core.
// Scope: login, inventory, and a minimal checkout path.
/// <reference types="cypress" />

import { Sel } from '../support/selectors.js';

describe('SauceDemo - Accessibility smoke', () => {

  it('Login has no critical violations', () => {
    cy.visit('/');
    cy.injectAxe();

    cy.checkA11y(null, {
      includedImpacts: ['critical'],
    });
  });

  it('Inventory has no critical violations (ignores known select-name on sorter)', () => {
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

  it('Cart has no critical violations', () => {
    cy.ensureOnInventory();

    cy.addAnyItem();
    cy.openCart();

    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
    });
  });

  it('Checkout flow has no critical violations', () => {
    cy.ensureOnInventory();

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
