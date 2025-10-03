export const Sel = {
  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    submit: '[data-test="login-button"]',
    error: '[data-test="error"]'
  },
  inventory: {
    item: '.inventory_item',
    sort: '[data-test="product_sort_container"]',
    addToCart: (name) => `button[data-test="add-to-cart-${name}"]`,
    removeFromCart: (name) => `button[data-test="remove-${name}"]`,
    cartIcon: '.shopping_cart_link'
  },
  cart: {
    items: '.cart_item',
    checkout: '[data-test="checkout"]'
  },
  checkout: {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    finish: '[data-test="finish"]',
    completeHeader: '.complete-header'
  },
  burger: {
    menuBtn: '#react-burger-menu-btn',
    logout: '#logout_sidebar_link'
  }
};
