const { createToken } = require('../support/api-helpers');

describe('Bookings CRUD', () => {
  let bookingId;
  let token;
  const base = Cypress.config('baseUrl');

  before(() => {
    return createToken(base).then(t => token = t);
  });

  it('creates a booking', () => {
    cy.fixture('booking.json').then(payload => {
      cy.request('POST', `${base}/booking`, payload).then(res => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('bookingid');
        expect(res.body).to.have.property('booking');
        bookingId = res.body.bookingid;
      });
    });
  });

  it('reads the booking', () => {
    cy.then(() => {
      expect(bookingId, 'booking id present').to.be.a('number');
    });
    cy.request('GET', `${base}/booking/${bookingId}`).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('firstname');
    });
  });

  it('updates the booking (PUT)', () => {
    cy.request({
      method: 'PUT',
      url: `${base}/booking/${bookingId}`,
      headers: { Cookie: `token=${token}` },
      body: {
        firstname: 'James',
        lastname: 'Brown',
        totalprice: 222,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Dinner'
      }
    }).then(res => {
      expect(res.status).to.be.oneOf([200, 201]);
      expect(res.body.firstname).to.eq('James');
    });
  });

  it('partially updates the booking (PATCH)', () => {
    cy.request({
      method: 'PATCH',
      url: `${base}/booking/${bookingId}`,
      headers: { Cookie: `token=${token}` },
      body: { additionalneeds: 'Late Checkout' }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.additionalneeds).to.include('Checkout');
    });
  });

  it('deletes the booking', () => {
    cy.request({
      method: 'DELETE',
      url: `${base}/booking/${bookingId}`,
      headers: { Cookie: `token=${token}` },
    }).then(res => {
      expect(res.status).to.be.oneOf([201, 200]); // API sometimes returns 201
    });
  });
});
