//Test for adding products quickly to cart from Mens, Womens, and Kids page

const cartObjects = {
    0: {
        0: {
            id: 45,
            name: "ULTRABOOST DNA 1.0 SHOES",
            image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/cdfdf1409e054322b9e0ac6d011da5e2_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_01_standard.jpg",
            images: [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/cdfdf1409e054322b9e0ac6d011da5e2_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_01_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/02705e8729c7435e9bb9ac6d01265a01_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_02_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/ac3cfbfce4a84b598864ac6d011963ac_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_03_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/a14abd8e93004e4b9706ac6d0115d8f0_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_04_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy/44bcb47866b04e739aa4ac6d0119f6ef_9366/Ultraboost_DNA_1.0_Shoes_Green_H05264_05_standard.jpg",
            ],
            price: 180,
            stock: 1,
            itemCategory: "mens",
            itemType: "sneakers",
            size: "6.0",
            productID: "h4HMDzyc",
            colors: "Bahia Mint / Eqt Green / Cloud White",
            quantity: 1,
        },
    },
    1: {
        1: {
            id: 64,
            name: "Women's Full-Zip Fleece",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2b1f0229-5dc6-4782-902e-df0deba58a2f/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
            images: [
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5/2b1f0229-5dc6-4782-902e-df0deba58a2f/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/9408f7da-20cb-46f3-b35a-4dde0a93b184/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/414b66a1-9c05-4f53-b956-d333cf3a0872/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/ca6b2c7b-a7d8-4e98-998d-ddbf95075159/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/07442ede-f502-4c9e-b47c-dd5da2cbd448/sportswear-womens-full-zip-fleece-hoodie-bg6b74.png",
            ],
            price: 75,
            stock: 1,
            itemCategory: "womens",
            itemType: "sweaters",
            size: "large",
            productID: "toe5vhVU",
            colors: "Black / Blue / Pink",
            quantity: 1,
        },
    },
    2: {
        2: {
            id: 66,
            name: "Nike Air Force 1 LE",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ebad848a-13b1-46d5-a85e-49b4b6a4953c/air-force-1-le-big-kids-shoe-3JNSvS.png",
            images: [
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5/ebad848a-13b1-46d5-a85e-49b4b6a4953c/air-force-1-le-big-kids-shoe-3JNSvS.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/d4087d46-d932-425c-bf06-386c470c7042/air-force-1-le-big-kids-shoe-3JNSvS.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/4ee7f9e9-9f1f-4395-95f4-ceca25120f39/air-force-1-le-big-kids-shoe-3JNSvS.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/37a8100f-518e-42a6-b09b-bd3c259a59b1/air-force-1-le-big-kids-shoe-3JNSvS.png",
                "https://static.nike.com/a/images/t_PDP_864_v1/f_auto",
                "b_rgb:f5f5f5",
                "q_80/469a549f-81fb-4f84-bfd5-e8d01827e2cb/air-force-1-le-big-kids-shoe-3JNSvS.png",
            ],
            price: 80,
            stock: 1,
            itemCategory: "kids",
            itemType: "sneakers",
            size: "8.5",
            productID: "yU88AFG0",
            colors: "White",
            quantity: 1,
        },
    },
};

describe("adding to cart quick", () => {
    it("user can add to cart from different catagories", () => {
        //go to home page
        cy.visit("http://localhost:3000");
        //go to mens page
        cy.get("#nav-pages-container > a").eq(0).click();
        //click different shoe size
        cy.get(".product-size-container > span").eq(3).click();
        //add item to cart
        cy.get(".product-container")
            .eq(0)
            .get(".product-cart")
            .invoke("attr", "style", "display:block");
        cy.get(".product-container").eq(0).get(".product-cart").eq(0).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                console.log(state);
                state.cartReducer.cart[0].stock = 1;
                expect(state.bagCountReducer).to.be.a("number").and.equal(1);
                expect(state.cartReducer.cart).to.be.a("object").and.to.deep.equal(cartObjects[0]);
            });
        cy.findByRole("button", {
            name: /close/i,
        }).click();
        //go to womens page
        cy.get("#nav-pages-container > a").eq(1).click();
        //go to sweaters category
        cy.get('li[name="sweaters"]').should("be.visible").click({ force: true });
        cy.findByRole("heading", { name: /women's full\-zip fleece/i }).should("be.visible");
        //add to cart
        cy.get(".product-container")
            .eq(0)
            .get(".product-cart")
            .invoke("attr", "style", "display:block");
        cy.get(".product-container").eq(0).get(".product-cart").eq(0).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                state.cartReducer.cart[0].stock = 1;
                state.cartReducer.cart[1].stock = 1;
                expect(state.bagCountReducer).to.be.a("number").and.equal(2);
                expect(state.cartReducer.cart)
                    .to.be.a("object")
                    .and.to.deep.equal(Object.assign(cartObjects[0], cartObjects[1]));
            });
        cy.findByRole("button", {
            name: /close/i,
        }).click();
        //go to kids page
        cy.get("#nav-pages-container > a").eq(2).click();
        //add to cart
        cy.get(".product-container")
            .eq(0)
            .get(".product-cart")
            .invoke("attr", "style", "display:block");
        cy.get(".product-container").eq(0).get(".product-cart").eq(0).click();
        //check if state is correct
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                state.cartReducer.cart[0].stock = 1;
                state.cartReducer.cart[1].stock = 1;
                state.cartReducer.cart[2].stock = 1;
                expect(state.bagCountReducer).to.be.a("number").and.equal(3);
                expect(state.cartReducer.cart)
                    .to.be.a("object")
                    .and.to.deep.equal(
                        Object.assign(cartObjects[0], cartObjects[1], cartObjects[2])
                    );
            });
    });
});
