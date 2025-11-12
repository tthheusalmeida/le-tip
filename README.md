<h3 align="center">
  <img 
    src="https://raw.githubusercontent.com/tthheusalmeida/le-tip/main/public/cover/app-preview.gif" 
    alt="Le/Tip app preview" 
    title="Le/Tip" 
    style="width: 600px; max-width: 100%; border-radius: 12px;" 
  />
  <br>
</h3>

<p align="center">
  <strong>Le/Tip</strong> — A responsive and elegant tip calculator built with Vue 3, designed for smooth currency conversion and delightful UX.
</p>

<p align="center">
  <a href="https://github.com/tthheusalmeida/le-tip/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" target="_blank" />
  </a>
</p>

# 📂 Table of Contents

- [About](#about)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Testing](#testing)
- [Setup & Commands](#setup--commands)
- [License](#license)

<a id="about"></a>

## 👤 About

**Le/Tip** is a single-page application (SPA) built with **Vue.js 3** for calculating and splitting tips easily.  
You can input the total bill, tip percentage, and number of people sharing the bill — the app instantly calculates each person’s share.

The total can be entered in **USD (Dollar)** or **EUR (Euro)**, and the app automatically fetches the **current exchange rate to BRL (R$)** using the [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas) through a REST call.

<a id="technology-stack"></a>

## 💻 Technology Stack

This project was developed with the following technologies and tools:

### 🧠 Core

- [Vue 3](https://vuejs.org/) — Progressive framework for building user interfaces
- [Vite](https://vitejs.dev/) — Fast build tool and development server
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript for scalable apps

### 🧩 UI & UX

- [vue3-icons](https://www.npmjs.com/package/vue3-icons) — Icon components for Vue 3
- [vue3-snackbar](https://www.npmjs.com/package/vue3-snackbar) — Snackbar notifications for a polished user experience
- [@vueuse/core](https://vueuse.org/) — Collection of essential Vue Composition utilities

### 🧪 Testing & Quality

- [Vitest](https://vitest.dev/) — Fast unit and integration testing
- [Cypress](https://www.cypress.io/) — End-to-end testing for full user flows
- [@vue/test-utils](https://test-utils.vuejs.org/) — Vue component testing utilities
- [ESLint](https://eslint.org/) — Linting and static code analysis
- [Prettier](https://prettier.io/) — Code formatter for consistent style

### 🛠️ Development & Tooling

- [vite-plugin-vue-devtools](https://github.com/vuejs/devtools-next) — Vue DevTools integration for debugging
- [npm-run-all2](https://github.com/mysticatea/npm-run-all) — Efficiently run multiple npm scripts in parallel or sequence
- [postcss-nested](https://github.com/postcss/postcss-nested) — CSS nesting for cleaner styles
- [jiti](https://github.com/unjs/jiti) — Runtime TypeScript loader used internally by Vite

<a id="features"></a>

## ✨ Features

- 💰 **Tip Calculator:** Enter bill total, desired tip, and number of people to split the total instantly.
- 🌍 **Currency Conversion:** Supports USD and EUR, automatically converted to BRL using live data from AwesomeAPI.
- 🌓 **Light & Dark Mode:** Switch themes seamlessly for better accessibility and comfort.
- 🎨 **Smooth Transitions:** Subtle animations enhance user experience during currency or theme changes.
- 🔄 **Loading States:** Displays animated loading indicators during API requests.
- 📱 **Responsive Design:** Optimized for both desktop and mobile screens.

<a id="testing"></a>

## 🧪 Testing

Le/Tip is fully tested to ensure robustness and reliability:

- **Unit Tests:** Validate individual components and utilities using **Vitest**.
- **Integration Tests:** Confirm module interactions using **Vitest + Vue Test Utils**.
- **End-to-End Tests:** Simulate complete user interactions with **Cypress**.

Run all tests locally:

```bash
npm run test:unit
npm run test:e2e:dev
```

<a id="setup--commands"></a>

## ⚙️ Setup & Commands

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint codebase

```bash
npm run lint
```

<a id="license"></a>

## 📝 License

This project is licensed under the MIT License. See the [license page](https://opensource.org/licenses/MIT) for more information.

---

<h4 align="center">
  Made with ❤️ by <a href="https://www.linkedin.com/in/dev-almeida-matheus/" target="_blank">Matheus Almeida</a>
</h4>
