export default function createPaypalCheckout(
    couponApplied,
    coupon,
    cartInfo,
    customerInfo,
    updateCartInfo,
    history
) {
    if (couponApplied) {
        customerInfo["coupon"] = coupon;
    }
    customerInfo["cart"] = cartInfo;
    return fetch("/api/createorder", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customerInfo),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (orderData) {
            if (orderData.status === false) {
                localStorage.setItem("cart", JSON.stringify(orderData.cart));
                if (!window.Cypress) {
                    updateCartInfo(dispatch);
                    history.push("/");
                    return false;
                }
                return false;
            }
            return orderData.id;
        });
}
