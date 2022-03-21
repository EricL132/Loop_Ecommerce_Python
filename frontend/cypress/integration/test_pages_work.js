

describe("test pages work", () => {
    const checkPage = (keyword) => {
        cy.visit("http://localhost:3000/pages/" + keyword);
        cy.get(".list-section").each((el) => {
            return new Cypress.Promise((resolve) => {
                cy.visit(`http://localhost:3000/pages/${keyword}/` + el.attr("name"));
                cy.get(".product-container").its("length").should("be.greaterThan", 0);
                resolve();
            });
        });
    };
    it("mens page works", () => {
        checkPage("men");
    });
    it("womens page works", () => {
        checkPage("women");
    });
    it("kids page works", () => {
        checkPage("kids");
    });
    it("specific products page",()=>{
        const products = ["h4HMDzyc","d1wUKB8k","apc2VapV","HrNzuE4x","3iMx2DT7"]
        for(let i of products){
            cy.visit("http://localhost:3000/pages/product/"+i)
            cy.get(".size-span").its("length").should("be.greaterThan",0)
        }
    })
});
