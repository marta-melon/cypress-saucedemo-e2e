# cypress-restful-booker-api (fixed)

Stable Cypress project for testing the **Restful Booker** API.

## Run locally
```bash
npm ci
npm test
```

### Base URL
Defaults to `https://restful-booker.herokuapp.com`. Override with:
```bash
BOOKER_BASE_URL=http://localhost:3001 npm test
```

## Specs
- `auth.cy.js` – token creation sanity
- `bookings-crud.cy.js` – create/read/update/delete booking
- `bookings-negative.cy.js` – negative flows
- `security-sanity.cy.js` – simple headers checks
- `sla-metrics.cy.js` – response-time smoke

All specs use plain `cy.request()` and CommonJS config to avoid Webpack/ESM bundling issues seen in CI.
