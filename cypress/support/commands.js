// Safe optional load for cypress-image-snapshot
try { require('cypress-image-snapshot/command') } catch(e) { console.warn('cypress-image-snapshot not loaded:', e?.message || e) }
import 'cypress-axe';
import { Sel } from './selectors.js';

// Auth
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/');
    cy.get(Sel.login.username).type(username);
    cy.get(Sel.login.password).type(password, { log: false });
    cy.get(Sel.login.submit).click();
    cy.url().should('include', '/inventory.html');
  });
});

Cypress.Commands.add('logout', () => {
  cy.get(Sel.burger.menuBtn).click();
  cy.get(Sel.burger.logout).click();
  cy.url().should('include', '/');
});

// Cart
Cypress.Commands.add('addItem', (slug) => {
  cy.get(Sel.inventory.addToCart(slug)).click();
  cy.get(Sel.inventory.cartIcon).click();
});

// Checkout
Cypress.Commands.add('checkout', (data) => {
  cy.get(Sel.cart.checkout).click();
  cy.get(Sel.checkout.firstName).type(data.firstName);
  cy.get(Sel.checkout.lastName).type(data.lastName);
  cy.get(Sel.checkout.postalCode).type(data.postalCode);
  cy.get(Sel.checkout.continue).click();
  cy.get(Sel.checkout.finish).click();
});

import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
addMatchImageSnapshotCommand({
  failureThreshold: Cypress.env('visualThreshold') || 0.02,
  failureThresholdType: 'percent'
});
