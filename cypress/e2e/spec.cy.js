describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('log out', () => {
    cy.getDataCy('log-out-btn').should('exist').click()
  })

})