export const Sel = {

  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    button: '[data-test="login-button"]',
    error: '[data-test="error"]',
  },

  // --- Main menu (burger) ---
  menu: {
    button: '#react-burger-menu-btn',
    logout: '#logout_sidebar_link',
  },

  // --- Inventory (catalog) ---
  inventory: {
    item: '.inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    cartIcon: '.shopping_cart_link',

    sort: '[data-test="product-sort-container"]',

    addToCart: (name) => `button[data-test="add-to-cart-${name}"]`,
    removeFromCart: (name) => `button[data-test="remove-${name}"]`,
  },

  // --- Inventory item ---
  inventoryItem: {
    removeFromCart: '[data-test="remove"]',
    backToProduct: '[data-test="back-to-products"]'
  },

  // --- Cart ---
  cart: {
    items: '.cart_item',
    itemPrice: '.inventory_item_price',

    checkout: '[data-test="checkout"]',
    continueShopping: '[data-test="continue-shopping"]'
  },

  // --- Checkout ---
  checkout: {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    finish: '[data-test="finish"]',
    completeHeader: '.complete-header',
    error: '[data-test="error"]',
  },
};
