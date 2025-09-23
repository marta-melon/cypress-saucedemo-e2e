describe('SLA metrics', () => {
  const base = Cypress.config('baseUrl');
  const maxMs = Number(Cypress.env('SLA_MS') || 1500);

  it('GET /booking within SLA', () => {
    const start = Date.now();
    cy.request('GET', `${base}/booking`).then(res => {
      const took = Date.now() - start;
      cy.log(`Took ${took}ms`);
      expect(res.status).to.eq(200);
      expect(took).to.be.lessThan(maxMs);
    });
  });
});
