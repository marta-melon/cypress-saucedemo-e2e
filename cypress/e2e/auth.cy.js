describe('Auth', () => {
  it('creates token with default creds', () => {
    const base = Cypress.config('baseUrl');
    cy.request('POST', `${base}/auth`, {
      username: 'admin',
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token').and.to.be.a('string').and.to.have.length.greaterThan(5);
    });
  });
});
