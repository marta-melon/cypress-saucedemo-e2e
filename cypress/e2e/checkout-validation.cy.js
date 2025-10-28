describe('Checkout validation', () => {
  beforeEach(() => {
cy.ensureOnInventory();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.openCart();
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('requires first name, last name and postal code', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'First Name is required');
    cy.get('[data-test="firstName"]').type('Marta');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Last Name is required');
    cy.get('[data-test="lastName"]').type('Tester');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Postal Code is required');
  });
});
