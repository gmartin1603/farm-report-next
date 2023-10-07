describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=dName-input]').should('not.exist')
    cy.get('[data-cy=email-input]').should('exist')
    cy.get('[data-cy=password-input]').should('exist')
    cy.get('[data-cy=password2-input]').should('not.exist')
    cy.get('[data-cy=login-btn]').should('exist')
    cy.get('[data-cy=google-auth-btn]').should('exist')

    // fill email with georgemartin1603@yahoo.com
    cy.get('[data-cy=email-input]').type('georgemartin1603@yahoo.com')
    cy.get('[data-cy=password-input]').type('Sonic3112')
  })
})