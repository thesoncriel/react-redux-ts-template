/// <reference types="cypress" />

declare namespace Cypress {
  interface Chaninable {
    prepareLogin(): Chainable<Element>;
  }
}
