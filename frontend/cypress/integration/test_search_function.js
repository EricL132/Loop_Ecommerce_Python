describe("test search functions",()=>{
    it('test search nike',()=>{
        cy.visit('http://localhost:3000/')
        cy.findByRole('button', {
            name: /search/i
          }).click()
        cy.findByRole('textbox').type('nike').type('{enter}')
        cy.get(".product-container").its("length").should("be.greaterThan", 0);
    })
})