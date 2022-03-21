describe("testing login logout", () => {
    it("login logout", () => {
        cy.visit("http://localhost:3000/account/login");
        cy.findByRole("textbox").type(Cypress.env("TESTACCOUNTEMAIL"));
        cy.findByPlaceholderText(/password/i).type(Cypress.env("TESTACCOUNTPASS"));
        cy.findByRole("button", {
            name: /sign in/i,
        }).click();
        cy.findByRole("button", {
            name: /log out/i,
        }).should("be.visible");
        cy.findByRole("button", {
            name: /log out/i,
        }).click();
        cy.findByRole("button", {
            name: /account/i,
        }).click();
        cy.findByRole("button", {
            name: /sign in/i,
        }).should("be.visible");
    });
});
