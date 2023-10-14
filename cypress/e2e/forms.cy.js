describe('form tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('login form test', () => {
    cy.getDataCy('dName-input').should('not.exist')
    cy.getDataCy('password2-input').should('not.exist')
    cy.getDataCy('login-btn').should('exist')
    cy.getDataCy('google-auth-btn').should('exist')

    // email and password aliases
    cy.getDataCy('email-input').find('input').as('email')
    cy.getDataCy('password-input').find('input').as('password')

    cy.get('@email').type('cypress@farmreport.com')
    cy.get('@password').type('testPass01')
    cy.getDataCy('login-btn').click()

    cy.wait(2000)

    // cy.getDataCy('log-out-btn').click()

  })

})