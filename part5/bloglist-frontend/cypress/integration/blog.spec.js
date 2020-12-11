describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/reset')
    const user = {
      name: 'teddy',
      username: 'teddy',
      password: 'teddy',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit("http://localhost:3003")
  })

  it('visit the website', function() {
    cy.visit("http://localhost:3003")
    cy.contains('login')
  })  
})