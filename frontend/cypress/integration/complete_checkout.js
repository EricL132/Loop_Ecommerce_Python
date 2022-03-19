import createPaypalCheckout from "../../src/components/utils/createPaypalCheckout";
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
};

const sim_customer_info = {
    first_name: "fdsa",
    last_name: "fdas",
    email: "fsdafdsa",
    address: "fdsa",
    zip: "fdsa",
    city: "fds",
    state: "AL",
    coupon: "JGFNB3 ",
};
describe("complete checkout", () => {
    it("user can complete who checkout as guest", async () => {
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
                state.cartReducer.cart[0].stock = 1;
                expect(state.bagCountReducer).to.be.a("number").and.equal(1);
                expect(state.cartReducer.cart).to.be.a("object").and.to.deep.equal(cartObjects[0]);
            });
        //Go to checkout page
        cy.findByRole("button", {
            name: /checkout/i,
        }).click();
        //Enter Info
        cy.get("#email").type("contact@ericliao.me");
        cy.get("#first_name").type("Eric");
        cy.get("#last_name").type("Hi");
        cy.get("#address").type("123 Apple St");
        cy.get("#zip").type("12345");
        cy.get("#city").type("Apples");
        cy.findByRole("button", { name: /continue to payment/i }).click();
        cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
                expect(state.bagCountReducer).to.be.a("number").and.equal(1);
                let total = 0;
                Object.entries(state.cartReducer.cart).map((item) => {
                    return (total += item[1].quantity * item[1].price);
                });
                cy.get(".summary_bottom_container > h3")
                    .eq(1)
                    .invoke("text")
                    .then((text) => {
                        expect(total).to.be.equal(parseInt(text.split("$")[1]));
                    });
            });
    });
});
