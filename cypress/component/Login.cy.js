const { default: Login } = require("@/pages/components/Login")

describe('Login.cy.js', () => {
    it('playground', () => {
      cy.mount(<Login />)
    })
})