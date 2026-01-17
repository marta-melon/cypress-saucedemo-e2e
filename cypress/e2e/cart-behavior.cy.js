// Cart behavior suite: multi-add, removal (cart & product page), and price consistency.
/// <reference types="cypress" />

import { Sel } from '../support/selectors.js';

const addItems = (items) => {
  items.forEach((item) =>
    cy.get(Sel.inventory.addToCart(item))
      .click()
  );
  return items;
};

const getCartItemTitles = () =>
  cy.get('.cart_item .inventory_item_name')
    .then(($els) => {
      return Cypress._.map($els, (el) => el.textContent.trim());
    });

// Helper: read price text to number like $29.99 -> 29.99
const priceToNum = (s) => Number(String(s).replace(/[^\d.]/g, ''));

describe('Cart behavior', () => {

  beforeEach(() => {
    cy.login();
    cy.ensureOnInventory();
  });

  it('adds multiple items and verifies all are present in the cart', () => {
    const items = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
    ];

    const expectedTitles = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    addItems(items);

    cy.openCart();

    cy.url()
      .should('include', '/cart.html');

    cy.get(Sel.cart.items)
      .should('have.length.at.least', items.length);

    getCartItemTitles().then((titles) => {
      expectedTitles.forEach(name => expect(titles).to.include(name));
    });
  });

  it('removes an item from the cart view', () => {
    const targetItem = 'sauce-labs-backpack';

    addItems([targetItem, 'sauce-labs-bike-light']);

    cy.openCart();

    // Remove backpack from the cart
    cy.get(Sel.inventory.removeFromCart(targetItem))
      .click();

    // Ensure it is no longer listed
    cy.get('.cart_item .inventory_item_name')
      .should('not.contain.text', 'Sauce Labs Backpack');
  });

  it('removes an item from the product page (via item detail)', () => {
    const item = 'sauce-labs-backpack';

    // Add from inventory, then go to product page and remove there
    cy.get(Sel.inventory.addToCart(item))
      .click();

    // Navigate to product detail by clicking the item title
    cy.contains(Sel.inventory.itemName, 'Sauce Labs Backpack')
      .click();

    cy.url()
      .should('include', 'inventory-item.html');

    // Remove from the product detail page.
    cy.get(Sel.inventoryItem.removeFromCart)
      .click();

    // Back to inventory
    cy.get('body').then(($b) => {
      if ($b.find(Sel.inventoryItem.backToProduct).length) {
        cy.get(Sel.inventoryItem.backToProduct)
          .click();
      } else if ($b.find('#back-to-products').length) {
        cy.get('#back-to-products')
          .click();
      } else {
        cy.go('back');
      }
    });

    cy.url()
      .should('include', '/inventory');

    // Verify the button switched to "Add to cart"
    cy.get('body').then(($b) => {
      if ($b.find(Sel.inventory.addToCart(item)).length) {
        cy.get(Sel.inventory.addToCart(item))
          .should('be.visible');
      } else {
        cy.contains('.inventory_item', 'Sauce Labs Backpack')
          .should('be.visible')
          .within(() => {
            cy.contains('button', 'Add to cart')
              .should('be.visible');
          });
      }
    });
  });

  it('keeps price consistent between inventory list and cart', () => {
    const item = 'sauce-labs-backpack';

    // Read price from inventory card
    cy.contains(Sel.inventory.item, 'Sauce Labs Backpack')
      .find(Sel.inventory.itemPrice)
      .should('be.visible')
      .invoke('text')
      .then((inventoryPriceText) => {
        const inventoryPrice = priceToNum(inventoryPriceText);

        // Add to cart and open cart
        cy.get(Sel.inventory.addToCart(item))
          .click();

        cy.openCart();

        // Read price from cart for the same item
        cy.contains(Sel.cart.items, 'Sauce Labs Backpack')
          .should('be.visible')
          .find(Sel.cart.itemPrice)
          .should('be.visible')
          .invoke('text')
          .then((cartPriceText) => {
            const cartPrice = priceToNum(cartPriceText);
            expect(cartPrice, 'cart price equals inventory price')
              .to.equal(inventoryPrice);
          });
      });
  });
});
