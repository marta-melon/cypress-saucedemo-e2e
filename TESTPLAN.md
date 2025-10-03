# Test Plan – SauceDemo (Cypress E2E)

## Objective
Verify that a user can reliably authenticate, browse, and complete checkout in SauceDemo, while guardrails (a11y, visual, security, SLA) prevent common regressions.

## Scope
**In scope**
- Auth: login (happy path), logout, invalid credentials.
- Catalog: sorting assertions; product card presence; add/remove from cart.
- Checkout: form validation (required fields, formats); end‑to‑end happy path to order confirmation.
- Quality gates: accessibility (axe), visual smoke, basic security headers/content‑type, SLA probe for key pages/APIs.

**Out of scope**
- Payment processor integration; email receipts; cross‑browser matrix beyond the configured runner.

## Test design
- **Data**: fixture users; cart state created per test, cleaned up in `afterEach` where needed.
- **Selectors**: centralized in `support/selectors.js` to decouple from DOM changes.
- **Resilience**: no arbitrary waits; built‑in retries (runMode=2).

## Non‑functional checks
- **Accessibility**: run axe on critical pages; fail build on serious/critical violations.
- **Visual**: compare key screens (login, inventory, cart, checkout overview) against baselines with permissive threshold.
- **Security sanity**: assert secure headers and JSON content type on API responses used by the UI.
- **SLA**: record response time for GET inventory/cart; p95 budget tracked in results (informational failure threshold ≥ defined budget).

## Environments
- Default: production demo site.
- Override `baseUrl` via env for staging mirrors.

## Entry/Exit criteria
- **Entry**: environment reachable; test user available.
- **Exit**: all **critical** E2E pass; no high‑severity a11y violations; visual diffs within threshold; SLA probe within budget.

## Reporting & triage
- Cypress dashboard/CI artifacts (screenshots, videos). Optional JUnit for CI test summaries.
- Failures triaged within the team; defects logged with repro steps and spec name.

## Risks & mitigations
- **Flaky selectors** → centralize selectors, prefer data‑test ids.
- **Third‑party outages** → keep tests hermetic (avoid external dependencies).

## Maintenance
- Review baselines monthly; update selectors when UI refactors; expand negative tests around checkout as new issues appear.
