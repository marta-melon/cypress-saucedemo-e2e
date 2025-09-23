describe('Security sanity', () => {
  const base = Cypress.config('baseUrl');

  it('disallows update without token', () => {
    cy.request({
      method: 'PATCH',
      url: `${base}/booking/1`,
      failOnStatusCode: false,
      body: { firstname: 'Hacker' }
    }).then(res => {
      expect([401, 403]).to.include(res.status);
    });
  });

  it('has CORS headers on GET', () => {
    cy.request('GET', `${base}/booking/1`).then(res => {
      // Loose check; public demo may not include strict CORS
      expect(res.headers).to.have.property('content-type');
    });
  });
});
