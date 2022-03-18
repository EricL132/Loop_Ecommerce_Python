//Test for adding products to cart from specific product page
const cartObjects = {
    0: {
        0: {
            id: 12,
            name: "ULTRABOOST DNA 1.0 SHOES",
            image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/cdfdf1409e054322b9e0ac6d011da5e2_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_01_standard.jpg",
            images: [
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/cdfdf1409e054322b9e0ac6d011da5e2_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_01_standard.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/02705e8729c7435e9bb9ac6d01265a01_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_02_standard.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/ac3cfbfce4a84b598864ac6d011963ac_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_03_standard.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/a14abd8e93004e4b9706ac6d0115d8f0_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_04_standard.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/44bcb47866b04e739aa4ac6d0119f6ef_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_05_standard.jpg",
            ],
            price: 180,
            stock: 6,
            itemCategory: "mens",
            itemType: "sneakers",
            size: "8.0",
            productID: "h4HMDzyc",
            colors: "Bahia Mint / Eqt Green / Cloud White",
            quantity: 1,
        },
    },
    1: {
        1: {
            id: 65,
            name: "RB3016 CLUBMASTER CLASSIC",
            image: "https://assets.sunglasshut.com/is/image/LuxotticaRetail/805289653653__STD__shad__qt.png?impolicy=SGH_bgtransparent",
            images: [],
            price: 161,
            stock: 32,
            itemCategory: "womens",
            itemType: "sunglasses",
            size: "0.0",
            productID: "h0259QTG",
            colors: null,
            quantity: 1,
        },
    },
    2: {
        2: {
            id: 68,
            name: "Little Kids' Tie-Dye Crew",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/421d9834-00e0-4a22-9c0d-de356951d63e/little-kids-tie-dye-crew-socks-3-pairs-3z3Csq.png",
            images: [],
            price: 18,
            stock: 3,
            itemCategory: "kids",
            itemType: "socks",
            size: "small",
            productID: "nYVvUBuu",
            colors: "Multi",
            quantity: 1,
        },
    },
};

describe("add to cart slow", () => {
    it("user can add to cart from specific product page", () => {
        //go to home page
        cy.visit("http://localhost:3000");
        //go to mens page
        cy.get("#nav-pages-container>button").eq(0).click();
        //go to product page
        cy.get(".product_image").eq(1).click();
        //select size
        cy.get(".size-span").eq(1).click();
        //add to bag
        cy.findByRole("button", { name: /add to bag/i }).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                console.log(state);
                expect(state.bagCountReducer).to.be.a("number").and.equal(1);
                expect(state.cartReducer.cart).to.be.a("object").and.to.deep.equal(cartObjects[0]);
            });
        cy.findByRole("button", {
            name: /close/i,
        }).click();
        //go to womens page
        cy.get("#nav-pages-container>button").eq(1).click();
        //go to sunglasses category
        cy.get('li[name="sunglasses"]').should("be.visible").click({ force: true });
        cy.findByRole("heading", { name: /rb3016 clubmaster classic/i }).should("be.visible");
        //add to cart
        cy.get(".product_image").eq(0).click();
        cy.get(".size-container").eq(0).click();
        cy.findByRole("button", { name: /add to bag/i }).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                expect(state.bagCountReducer).to.be.a("number").and.equal(2);
                expect(state.cartReducer.cart)
                    .to.be.a("object")
                    .and.to.deep.equal(Object.assign(cartObjects[0], cartObjects[1]));
            });
        cy.findByRole("button", {
            name: /close/i,
        }).click();
        //go to kids page
        cy.get("#nav-pages-container>button").eq(2).click();
        cy.get('li[name="socks"]').should("be.visible").click({ force: true });
        cy.get(".product-container").eq(0).click();
        cy.get(".size-container").eq(0).click();
        cy.findByRole("button", { name: /add to bag/i }).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                expect(state.bagCountReducer).to.be.a("number").and.equal(3);
                expect(state.cartReducer.cart)
                    .to.be.a("object")
                    .and.to.deep.equal(
                        Object.assign(cartObjects[0], cartObjects[1], cartObjects[2])
                    );
            });
    });
});
