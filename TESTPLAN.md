# Test Plan – Cypress E2E (SauceDemo)

## Objective
The goal of this test plan is to verify critical end-to-end user flows of the SauceDemo application using automated Cypress tests.
The focus is on functional correctness of core paths rather than exhaustive coverage of all UI permutations.

## Scope

### In Scope
- User authentication (standard and locked users)
- Product list visibility
- Product sorting by price
- Adding and removing items from the cart
- Checkout form validation
- Successful checkout flow
- Logout functionality
- Accessibility smoke checks on key views

### Out of Scope
- Performance and load testing
- Visual regression testing
- API and backend testing
- Mobile-specific layouts
- Cross-browser testing beyond Electron and Chrome

## Test Environment
- Application under test: SauceDemo (public demo site)
- Browsers: Electron, Chrome
- Operating systems:
  - Linux (CI)
  - Local developer environments
- Test framework: Cypress

## Test Data
- User credentials provided via environment variables
- Static data stored in Cypress fixtures when required
- No persistent data assumptions between test runs

## Entry Criteria
- Application is accessible
- Project dependencies installed
- Required environment variables configured

## Exit Criteria
- All planned automated scenarios executed
- No blocking failures in core user paths
- Test execution results available in CI reports

## Test Execution
- Local execution via `npm test`
- Interactive execution via `npm run open`
- CI execution via GitHub Actions workflows

## Risks and Limitations
- Dependency on availability of external demo environment
- Limited control over test data resets
- UI changes in the demo application may require selector updates

## Maintenance Strategy
- Selectors centralized to minimize changes across tests
- Custom commands used for common flows
- Test plan and coverage updated together with new scenarios
- Obsolete references removed as the project evolves
