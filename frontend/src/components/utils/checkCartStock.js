export default async function checkCartStock() {
    await fetch("api/stock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cartInfo) }).then((res) => res.json()).then(data => {
        if (data.status === false) {
            localStorage.setItem("cart", JSON.stringify(data.cart))
            updateCartInfo(dispatch)
            history.push("/")
            return false
        }
    })
    return true
}