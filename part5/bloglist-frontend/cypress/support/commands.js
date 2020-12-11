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

// Cypress.Commands.add("login", ({username, password}) => {

// })

// Cypress.Commands.add("reset", () => {
//   cy.request('POST', 'http://localhost:3003/api/reset')
//   cy.request({
//     url: 'http://localhost:3003/api/login',
//     method: 'POST',
//     body: {
//       name: 'teddy',
//       username: 'teddy', 
//       password: 'teddy',
//     }
//   })

//   cy.visit('http://localhost:3003')
// })