// cypress/e2e/cart-behavior.cy.js
// Cart behavior suite: multi-add, removal (cart & product page), and price consistency.
// Uses centralized selectors from Sel for maintainability.

/// <reference types="cypress" />
import { Sel } from '../support/selectors.js';

// Helper: add N items by slug in order, returning the slugs we added
const addItems = (slugs) => {
  slugs.forEach((slug) => cy.get(Sel.inventory.addToCart(slug)).click());
  return slugs;
};

// Helper: extract cart item titles (for presence checks)
const getCartItemTitles = () =>
  cy.get('.cart_item .inventory_item_name').then($els => [...$els].map(el => el.textContent.trim()));

// Helper: read price text to number like $29.99 -> 29.99
const priceToNum = (s) => Number(String(s).replace(/[^\d.]/g, ''));

describe('Cart behavior', () => {
  beforeEach(() => {
    // Start each test on inventory as an authenticated user
    cy.login('standard_user', 'secret_sauce');
    cy.ensureOnInventory();
  });

  it('adds multiple items and verifies all are present in the cart', () => {
    const slugs = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
    ];

    addItems(slugs);

    cy.openCart();
    cy.url().should('include', '/cart.html');

    // Assert we have at least the number of items added
    cy.get(Sel.cart.items).should('have.length.at.least', slugs.length);

    // Assert each selected product is present by title
    getCartItemTitles().then((titles) => {
      // Map slugs to display names (SauceDemo naming)
      const expected = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
      ];
      expected.forEach(name => expect(titles).to.include(name));
    });
  });

  it('removes an item from the cart view', () => {
    const targetSlug = 'sauce-labs-backpack';

    addItems([targetSlug, 'sauce-labs-bike-light']);
    cy.openCart();

    // Remove backpack from the cart
    cy.get(Sel.inventory.removeFromCart(targetSlug)).click();

    // Ensure it is no longer listed
    cy.get('.cart_item .inventory_item_name')
      .should('not.contain.text', 'Sauce Labs Backpack');
  });

  it('removes an item from the product page (via item detail)', () => {
    const slug = 'sauce-labs-backpack';

    // Add from inventory, then go to product page and remove there
    cy.get(Sel.inventory.addToCart(slug)).click();

    // Navigate to product detail by clicking the item title
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.url().should('include', 'inventory-item.html');

    // Remove from the product detail page (same data-test naming)
        // Remove from the product detail page.
    // Note: on product detail, SauceDemo may use a generic [data-test="remove"] instead of slugged one.
    cy.get('body').then(($b) => {
      if ($b.find(Sel.inventory.removeFromCart(slug)).length) {
        cy.get(Sel.inventory.removeFromCart(slug)).click();
      } else {
        cy.get('[data-test="remove"]').click();
      }
    });

    // Back to inventory and verify the button switched to "Add to cart"
    cy.get('body').then(($b) => {
      if ($b.find('[data-test="back-to-products"]').length) {
        cy.get('[data-test="back-to-products"]').click();
      } else if ($b.find('#back-to-products').length) {
        cy.get('#back-to-products').click();
      } else if ($b.find('.inventory_details_back_button').length) {
        cy.get('.inventory_details_back_button').click();
      } else {
        cy.go('back');
      }
    });
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should('include', '/inventory');
    cy.get('.inventory_list').should('be.visible');
    cy.get('body').then(($b) => {
      if ($b.find(Sel.inventory.addToCart(slug)).length) {
        cy.get(Sel.inventory.addToCart(slug)).should('be.visible');
      } else {
        cy.contains('.inventory_item', 'Sauce Labs Backpack')
          .should('be.visible')
          .within(() => {
            cy.contains('button', 'Add to cart').should('be.visible');
          });
      }
    });

    // Back to inventory and verify the button switched to "Add to cart"
    cy.get('body').then(($b) => {
      if ($b.find('[data-test="back-to-products"]').length) {
        cy.get('[data-test="back-to-products"]').click();
      } else if ($b.find('#back-to-products').length) {
        cy.get('#back-to-products').click();
      } else if ($b.find('.inventory_details_back_button').length) {
        cy.get('.inventory_details_back_button').click();
      } else {
        cy.go('back');
      }
    });
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should('include', '/inventory');
    cy.get('.inventory_list').should('be.visible');
    cy.get('body').then(($b) => {
      if ($b.find(Sel.inventory.addToCart(slug)).length) {
        cy.get(Sel.inventory.addToCart(slug)).should('be.visible');
      } else {
        cy.contains('.inventory_item', 'Sauce Labs Backpack')
          .should('be.visible')
          .within(() => {
            cy.contains('button', 'Add to cart').should('be.visible');
          });
      }
    });
  });

  it('keeps price consistent between inventory list and cart', () => {
    const slug = 'sauce-labs-backpack';

    // Read price from inventory card
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('.inventory_item_price')
      .should('be.visible')
      .invoke('text')
      .then((inventoryPriceText) => {
        const inventoryPrice = priceToNum(inventoryPriceText);

        // Add to cart and open cart
        cy.get(Sel.inventory.addToCart(slug)).click();
        cy.openCart();

        // Read price from cart for the same item
        cy.contains('.cart_item', 'Sauce Labs Backpack')
          .should('be.visible')
          .find('.inventory_item_price')
          .should('be.visible')
          .invoke('text')
          .then((cartPriceText) => {
            const cartPrice = priceToNum(cartPriceText);
            expect(cartPrice, 'cart price equals inventory price').to.equal(inventoryPrice);
          });
      });
  });
});
