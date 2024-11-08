// cypress/support/commands.d.ts
/// <reference types="cypress" />

import { MountOptions, MountReturn } from 'cypress/react18';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to mount a React component.
       * @param component - React component to mount
       * @param options - Additional options to pass to the mount function
       */
      mount(component: React.ReactNode, options?: MountOptions): Chainable<MountReturn>;
    }
  }
}
