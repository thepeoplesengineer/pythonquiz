/// <reference path="./commands.d.ts" />
import { mount } from 'cypress/react18';
import '@testing-library/cypress/add-commands';

// Add mount to Cypress global commands
Cypress.Commands.add('mount', mount);

