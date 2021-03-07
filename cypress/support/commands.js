// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('prepareLogin', () => {
  cy.get('#txt_id').as('id');
  cy.get('#txt_pw').as('pw');
  cy.get('#btn_submit').as('submit');
  cy.get('#print').as('print');
  cy.intercept('/data/signin', req => {
    const { id } = req.body;

    if (id === 'sonic') {
      req.reply({
        fixture: 'login-error.json',
      });
    } else {
      req.reply({
        fixture: 'login-succ.json',
      });
    }
  }).as('apiSignin');
});
