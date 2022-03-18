describe("create_account", () => {
    it("user can create account", () => {
        //Go to login page
        cy.visit("http://localhost:3000")
        cy.findByRole('button', {
            name: /account/i
          }).click({force:true})
        //Click on register
        cy.findByRole('button', {
            name: /register/i
          }).click()
        //Enter Info
        cy.get('#fname').type('ffff')
        cy.get('#lname').type('lllllll')
        cy.get('#email').type(`test${(Math.random() + 1).toString(36).substring(5)}@loops.com`)
        cy.get('#password').type('password123')
        //Click Register
        cy.findByRole('button', {
            name: /register/i
          }).click()
        //Click if on account page
        cy.get('#logout').should('be.visible')
    });
});
