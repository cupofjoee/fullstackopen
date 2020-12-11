describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'teddy',
      username: 'teddy',
      password: 'teddy'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('teddy')
    cy.get('#password').type('teddy')
    cy.get('#login-button').click()

    cy.contains('teddy logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('teddy')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'teddy logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'teddy', password: 'teddy'})
    })

    it('a new note can be created', function() {
      cy.contains('create').click()
      cy.get('#note-form').type('Binge last dance')
      cy.contains('save').click()
      cy.contains('Binge last dance')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({content: 'margot robbie is hot', important: false})
      })
  
      it('it can be made important', function() {
        cy.get('.note > button').click()
        cy.contains('make not important')
      })

      it('clicking mark important with multiple notes', function() {
        cy.createNote({content: 'Exercise next month', important: false})
        cy.createNote({content: 'Exercise next year', important: false})

        cy.contains('Exercise next month').find('button').click()
        cy.contains('Exercise next month')
          .should('contain', 'make not important')
      })
    })
  })
})