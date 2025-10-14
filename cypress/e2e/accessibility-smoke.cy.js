/// <reference types="cypress" />

describe('SauceDemo - Accessibility smoke', () => {
  it('Login has no critical violations', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ['critical'] }, (violations) => {
      expect(violations).to.have.length(0);
    });
  });

  it('Inventory has no critical violations (after login; ignores known select-name on sorter)', () => {
    cy.ensureOnInventory();
    cy.injectAxe(); // inject first so axe is available
    cy.configureAxe({ rules: [{ id: 'select-name', enabled: false }] });
    cy.checkA11y(null, { includedImpacts: ['critical'] }, (violations) => {
      expect(violations).to.have.length(0);
    });
  });

  it('Cart has no critical violations (navigated via UI)', () => {
    cy.ensureOnInventory();
    cy.openCart();
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ['critical'] }, (violations) => {
      expect(violations).to.have.length(0);
    });
  });

  it('Checkout Step One has no critical violations (via add-to-cart → cart → checkout)', () => {
    cy.ensureOnInventory();
    cy.addAnyItem();
    cy.openCart();
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ['critical'] }, (violations) => {
      expect(violations).to.have.length(0);
    });
  });
});
