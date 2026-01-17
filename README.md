# Cypress E2E – SauceDemo

End-to-end test automation project built with Cypress.
The repository presents a realistic E2E setup focused on maintainability, readability, and CI execution rather than demo-only examples.

The framework is intentionally kept simple, but structured in a way that scales with growing test coverage.

## Tech Stack
- Cypress 13.x
- Node.js 20.x
- Mocha + Chai
- cypress-axe (accessibility checks)
- GitHub Actions
- JUnit reporter

## Installation
```bash
npm ci
```

## Running Tests

### Headless (default)
```bash
npm test
```

### Interactive
```bash
npm run open
```

## Configuration and Credentials
Sensitive data is not stored in the repository.

Credentials must be provided via environment variables (locally or in CI):
```bash
CYPRESS_USER_NAME=standard_user
CYPRESS_USER_PASS=secret_sauce
```

Cypress automatically exposes variables prefixed with `CYPRESS_`.
Authentication is handled through custom commands (for example `cy.login()`), so test specs remain clean.

## Project Structure
```
cypress/
  e2e/                 # Test specifications
  support/
    commands.js        # Custom Cypress commands
    selectors.js       # Centralized UI selectors
results/
  junit-*.xml          # CI test reports
```

## Test Coverage
The framework focuses on core user paths:
- authentication and authorization scenarios,
- product listing and sorting logic,
- cart operations,
- checkout validation,
- logout flow,
- basic accessibility smoke checks.

Negative scenarios (for example locked users or invalid states) are covered where relevant.

## CI Integration
Tests are executed automatically in GitHub Actions on push and pull request events.
Workflows support running tests in different browsers (Electron / Chrome).
JUnit reports are generated to allow integration with CI tools and quality gates.

## Design Decisions
- Custom commands are used to encapsulate repeated flows.
- Selectors are centralized to reduce maintenance cost.
- Tests avoid implementation details where possible and focus on user behavior.
- No hard dependency on external services beyond the demo application.
