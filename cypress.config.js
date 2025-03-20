const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://sweetshop.netlify.app",
    setupNodeEvents(on, config) {
      // Define Node event listeners here if needed
    },
  },
});