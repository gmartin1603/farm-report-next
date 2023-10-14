describe('ReportSelect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('create-report', () => {
    cy.getDataCy('report-name-select').find('select').select('Test')
    cy.getDataCy('report-commodity-select').find('select').select('Corn')
    cy.getDataCy('report-year-select').find('select').select('2024')
    cy.getDataCy('create-report-btn').click()

    // intercept the request and stub the response
    cy.intercept('POST', 'http://localhost:5001/farm-report-staging/us-central1/app/createReport', {
      statusCode: 200,
      fixture: 'createReport.json'
    }).as('createReport')
  })

})