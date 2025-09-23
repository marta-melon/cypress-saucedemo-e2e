// Common helpers for API tests
function createToken(baseUrl) {
  return cy.request('POST', `${baseUrl}/auth`, {
    username: 'admin',
    password: 'password123'
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('token');
    return res.body.token;
  });
}

module.exports = { createToken };
