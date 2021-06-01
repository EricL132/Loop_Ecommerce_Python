import {showCartInfo} from '../../redux/actions/index'
import updateCartInfo from './updateCartInfo'
export function getCartInfo() {
    return JSON.parse(localStorage.getItem("cart"))
}
export default function addToCart(e,products,dispatch) {
    
    let cart = getCartInfo()
    const item = e.currentTarget.getAttribute("item")
    let product = products[item]

    if (cart) {
        if (product.id in cart) {
            if (product.stock !== cart[product.id].quantity) {
                cart[product.id].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        } else {
            product.quantity = 1
            cart[product.id] = product
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    } else {
        product.quantity = 1
        localStorage.setItem("cart", JSON.stringify({ [product.id]: product }))
    }
    updateCartInfo(dispatch)
    dispatch(showCartInfo())
}