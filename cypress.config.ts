import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: 'cypress/support/component.ts', // Ensure Cypress loads the correct support file
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false, // Set to false if you don't need a support file for e2e tests
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
