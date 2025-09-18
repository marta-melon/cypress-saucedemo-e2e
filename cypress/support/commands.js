// / <reference types="cypress" />

// / <reference types="cypress" />
import 'cypress-axe'
import { Sel } from './selectors.js'

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

Cypress.Commands.add('addItem', (slug) => {
  cy.get(Sel.inventory.addToCart(slug)).click();
  cy.get(Sel.inventory.removeFromCart(slug)).should('be.visible');
});

Cypress.Commands.add('checkout', (data: { firstName; lastName; postalCode }) => {
  cy.get(Sel.cart.checkout).click();
  cy.get(Sel.checkout.firstName).type(data.firstName);
  cy.get(Sel.checkout.lastName).type(data.lastName);
  cy.get(Sel.checkout.postalCode).type(data.postalCode);
  cy.get(Sel.checkout.continue).click();
  cy.get(Sel.checkout.finish).click();
  cy.get(Sel.checkout.completeHeader).should('contain.text', 'Thank you');
});

// Visual testing commands
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand({ failureThreshold: Cypress.env('visualThreshold') || 0.02, failureThresholdType: 'percent' });

declare global {
  namespace Cypress {
    interface Chainable {
      login(username, password): Chainable<void>;
      logout(): Chainable<void>;
      addItem(slug): Chainable<void>;
      checkout(data: { firstName; lastName; postalCode }): Chainable<void>;
      matchImageSnapshot(name?): Chainable<void>;
    }
  }
}
