import { showCartInfo } from '../../redux/actions/index'
import updateCartInfo from './updateCartInfo'
export function getCartInfo() {
    return JSON.parse(localStorage.getItem("cart"))
}
export default function addToCart(e, products, dispatch, id) {
    let cart = getCartInfo()
    let item = ""
    try {
        item = e.currentTarget.getAttribute("item")
    } catch (err) {
        item = e.getAttribute("item")
    }
    let product;
    if (products[item].length === 1) {
        product = products[item]
    } else {
        if (Array.isArray(products[item])) {
            product = products[item].filter((item) => {
                return item.id == id
            })
        }else{
            product=products
        }

    }
    product = product[0]

    if (cart) {
        for (var i = 0; i < Object.keys(cart).length; i++) {
            if (cart[i].id === product.id) {
                console.log('vcxvcx')
                if (product.stock !== cart[i].quantity) {
                    cart[i].quantity++;
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
                break;
            }
            if (i === Object.keys(cart).length - 1) {
                product.quantity = 1
                cart[i + 1] = product
                localStorage.setItem("cart", JSON.stringify(cart))
                break;
            }
        }


    } else {
        product.quantity = 1
        localStorage.setItem("cart", JSON.stringify({ [0]: product }))
    }
    updateCartInfo(dispatch)
    dispatch(showCartInfo())
}