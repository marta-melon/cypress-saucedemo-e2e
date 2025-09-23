describe('Bookings Negative', () => {
  const base = Cypress.config('baseUrl');

  it('fails to create a booking with bad payload', () => {
    cy.request({
      method: 'POST',
      url: `${base}/booking`,
      failOnStatusCode: false,
      body: { bad: 'payload' }
    }).then(res => {
      expect(res.status).to.be.oneOf([400, 500]); // depending on API behavior
    });
  });

  it('returns 404 for unknown booking', () => {
    cy.request({
      method: 'GET',
      url: `${base}/booking/99999999`,
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.be.oneOf([404, 405]);
    });
  });
});
