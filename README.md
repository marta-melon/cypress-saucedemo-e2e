# Cypress E2E Framework – SauceDemo Example

Comprehensive **end-to-end test automation framework** built with [Cypress](https://www.cypress.io/), showcasing:
- modular test design,
- clean selector management,
- accessibility and regression checks,
- CI/CD integration with GitHub Actions.

> 💡 This project demonstrates my approach to building maintainable, production-ready E2E suites — not just “tests that click”.

---

## 🔧 Tech Stack
- **Cypress 13.x**
- **Node 20.x**
- **cypress-axe** – accessibility testing
- **Mocha + Chai** – assertions
- **GitHub Actions** – CI matrix (Electron / Chrome)
- **JUnit reporter** – machine-readable results for pipelines

---

## 🚀 Running the Tests

### Local Run
```bash
npm ci          # install dependencies
npm test        # headless run (Electron) + JUnit report
npm run open    # open Cypress runner (interactive)
```

### Credentials
For security reasons, test credentials are not stored in this repository.

You can provide your own user data in:
```bash
cypress.env.json
```
Example:
```json
{
  "USER_NAME": "your_user_here",
  "USER_PASS": "your_password_here"
}
```
or set environment variables (locally / in CI):
```bash
CYPRESS_USER_NAME=your_user
CYPRESS_USER_PASS=your_password
```

The `cy.login()` command reads these values automatically.

---

## 🧱 Project Structure
```
cypress/
  e2e/                # All E2E test specs
  support/
    commands.js       # Custom Cypress commands (login, logout, ensureOnInventory, etc.)
    selectors.js      # Centralized selectors map
  fixtures/
    users.json        # Example data
results/
  junit-[hash].xml    # Test reports for CI
```

---

## 🧩 Highlights & Good Practices

- **Custom commands:** Encapsulated flows (`cy.login`, `cy.logout`, etc.) to keep specs readable.
- **Centralized selectors:** All UI locators defined in `support/selectors.js` — no hard-coded selectors in tests.
- **Layered coverage:** Functional, regression, and accessibility checks in the same framework.
- **Continuous Integration:** Ready to run in GitHub Actions with JUnit output.
- **Clear reporting:** Console + XML output for visibility in pipelines.

---

## ✅ Example Scenarios

| Area | Test | Description |
|------|------|-------------|
| **Auth** | Login / Logout | Validates both happy path and negative user states |
| **Catalog** | Sorting | Confirms “low → high” pricing works numerically |
| **Checkout** | Validation | Verifies required fields block progression |
| **Accessibility** | A11y Smoke | Runs axe-core against key flows |
| **Visual** | Optional baseline | Placeholder for future visual regression |

---

## 🧠 Why This Repo

This repository is intended as a **portfolio piece** — to show:
- how I design a test framework from scratch,
- how I structure reusable components,
- how I document and communicate testing intent,
- and how I integrate with CI for automated quality gates.

It’s not just about testing *SauceDemo* — it’s about demonstrating **real-world E2E engineering practices**.

---

## 📄 License

MIT – free to use and adapt for demonstration or interview purposes.
