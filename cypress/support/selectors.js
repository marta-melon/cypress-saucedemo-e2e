// cypress/support/selectors.js
// Centralized selectors for SauceDemo tests.
// Backward-compatible keys included to match all existing specs.

export const Sel = {
  // --- Auth (login) ---
  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    // prefer "button", keep "submit" as alias for backward compatibility
    button:   '[data-test="login-button"]',
    submit:   '[data-test="login-button"]',
    error:    '[data-test="error"]',
  },

  // --- Main menu (burger) ---
  menu: {
    button: '#react-burger-menu-btn',
    logout: '#logout_sidebar_link',
  },
  // keep legacy namespace for compatibility
  burger: {
    menuBtn: '#react-burger-menu-btn',
    logout:  '#logout_sidebar_link',
  },

  // --- Inventory (catalog) ---
  inventory: {
    item: '.inventory_item',
    // SauceDemo sorter uses a hyphen in data-test attribute
    sort: '[data-test="product-sort-container"]',
    // helpers for dynamic product buttons
    addToCart: (name) => `button[data-test="add-to-cart-${name}"]`,
    removeFromCart: (name) => `button[data-test="remove-${name}"]`,
    cartIcon: '.shopping_cart_link',
  },

  // --- Cart ---
  cart: {
    items: '.cart_item',
    checkout: '[data-test="checkout"]',
  },

  // --- Checkout ---
  checkout: {
    firstName:      '[data-test="firstName"]',
    lastName:       '[data-test="lastName"]',
    postalCode:     '[data-test="postalCode"]',
    continue:       '[data-test="continue"]',
    finish:         '[data-test="finish"]',
    completeHeader: '.complete-header',
    error:          '[data-test="error"]', // validation banner on step one
  },
};
