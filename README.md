# 🍬 SweetShop Automation Testing with Cypress

![Cypress](https://img.shields.io/badge/Cypress-E2E%20Testing-green?logo=cypress&logoColor=white)  
![GitHub last commit](https://img.shields.io/github/last-commit/QA-AJev/sweetshop_automation_portfolio)  
![GitHub repo size](https://img.shields.io/github/repo-size/QA-AJev/sweetshop_automation_portfolio)  
![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/QA-AJev/sweetshop_automation_portfolio/ci.yml?label=CI%20Pipeline)

This project contains **automated end-to-end (E2E) tests** for [SweetShop](https://sweetshop.netlify.app/) using **Cypress**.  
Tests cover **UI interactions, user authentication, product ordering, and checkout functionality**.

---

## 📖 Table of Contents

- [🔹 Features](#-features)
- [⚙️ Installation](#️-installation)
- [🚀 Running Tests](#-running-tests)
- [🛠 CI/CD Pipeline](#-cicd-pipeline)
- [📂 Project Structure](#-project-structure)
- [📸 Screenshots](#-screenshots)
- [📌 Test Scenarios](#-test-scenarios)
- [💡 Tech Stack](#-tech-stack)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🔹 Features

✅ Automated E2E UI Tests with **Cypress**  
✅ API Testing with **Cypress Requests**  
✅ **CI/CD Pipeline** using **GitHub Actions**  
✅ **Page Object Model (POM)** for structured test cases  
✅ **Mochawesome Reports** for test results

---

## ⚙️ Installation

Make sure you have **Node.js (>=16)** and **Cypress** installed.

````sh
git clone https://github.com/QA-AJev/sweetshop_automation_portfolio.git
cd sweetshop_automation_portfolio
npm install

---

## ⚙️ Installation

Make sure you have **Node.js (>=16)** and **Cypress** installed.

---

## 🚀 Running Tests

### **Run all Cypress tests in UI mode**
```sh
npx cypress open
````

### **Run tests in headless mode**

```sh
npx cypress run
```

### **Generate test reports**

```sh
npx cypress run --reporter mochawesome
```

---

## 📂 Project Structure

```bash
sweetshop_automation_portfolio/
│-- cypress/
│   ├── integration/     # Test cases
│   ├── fixtures/        # Test data
│   ├── plugins/         # Plugins
│   ├── support/         # Custom commands & POM
│-- reports/             # Test reports (Mochawesome)
│-- cypress.json         # Cypress config
│-- package.json         # Dependencies
│-- README.md            # Project documentation
```

---

## 📸 Screenshots

Example test execution:

N/A

---

## 📌 Test Scenarios

| Test Case         | Description                                     |
| ----------------- | ----------------------------------------------- |
| ✅ Login Test     | Verify user login with valid credentials        |
| ✅ Signup Test    | Register a new user and verify account creation |
| ✅ Product Search | Search for a product and validate results       |
| ✅ Checkout Test  | Add items to cart and complete checkout         |
| ✅ API Test       | Validate API responses with Cypress             |

---

## 💡 Tech Stack

- 🛠 **Cypress** - JavaScript E2E testing framework
- 📜 **Mochawesome** - HTML test reporting
- ☁ **GitHub Actions** - CI/CD integration

---

## 🤝 Contributing

Contributions are welcome! 🚀

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes and push
4. Open a pull request

---

## 📜 License

This project is licensed under the **MIT License**.

---

🔹 **Happy Testing! 🚀**
