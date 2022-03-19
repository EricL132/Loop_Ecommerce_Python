export default function confirmPaypalCheckout(data,setCheckedOut,updateCartInfo,dispatch,closeCart,history){
    return fetch('/api/checkout/' + data.orderID + '/capture/', {
        method: 'post'
    }).then(function (res) {
        return res.json();
    }).then(function (orderData) {
        var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

        if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
            return actions.restart();
        }

        if (errorDetail) {
            var msg = 'Sorry, your transaction could not be processed.';
            if (errorDetail.description) msg += '\n\n' + errorDetail.description;
            if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
            return alert(msg);
        }
        setCheckedOut(true)
        localStorage.removeItem("cart")
        updateCartInfo(dispatch)
        closeCart()
        history.push(`/order/${orderData.order_id}`)
    });
}