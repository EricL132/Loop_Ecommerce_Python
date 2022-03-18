//Test for adding products quickly to cart from Mens, Womens, and Kids page

const cartObjects = {
    0: {
        0: {
            id: 71,
            name: "COURT RALLYE SLIP X STAR WARS SHOES",
            image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/c2b42bdf6bdc4bf7874bad19017e7c13_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_01_standard.jpg",
            images: [
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/c2b42bdf6bdc4bf7874bad19017e7c13_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_01_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/80aaf09c02924918bcf1ad19017dbace_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_011_hover_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/e4ff0366604049feb5e4ad190183402c_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_012_hover_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/a8935c7d91804e07a7baad19017e5ee6_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_02_standard.jpg",
                "https://assets.adidas.com/images/h_840",
                "f_auto",
                "q_auto:sensitive",
                "fl_lossy",
                "c_fill",
                "g_auto/4a8e8d93f6d14114a295ad19017e3b72_9366/Court_Rallye_Slip_x_Star_Wars_Shoes_Black_FY5312_03_standard.jpg",
            ],
            price: 60,
            stock: 64,
            itemCategory: "mens",
            itemType: "sneakers",
            size: "9.5",
            productID: "e1UFVNjx",
            colors: null,
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
            stock: 11,
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
            stock: 5,
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
        cy.get("#nav-pages-container>button").eq(0).click();
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
                expect(state.bagCountReducer).to.be.a("number").and.equal(1);
                expect(state.cartReducer.cart).to.be.a("object").and.to.deep.equal(cartObjects[0]);
            });
        cy.findByRole("button", {
            name: /close/i,
        }).click();
        //go to womens page
        cy.get("#nav-pages-container>button").eq(1).click();
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
                expect(state.bagCountReducer).to.be.a("number").and.equal(3);
                expect(state.cartReducer.cart)
                    .to.be.a("object")
                    .and.to.deep.equal(
                        Object.assign(cartObjects[0], cartObjects[1], cartObjects[2])
                    );
            });
    });
});
