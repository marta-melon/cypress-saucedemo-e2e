describe('Checkout happy path', () => {
  it('purchases a single item successfully', () => {
cy.ensureOnInventory();
    // Add backpack (stable selector) and go to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.openCart();
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Marta');
    cy.get('[data-test="lastName"]').type('Test');
    cy.get('[data-test="postalCode"]').type('00-001');
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!');
  });
});
