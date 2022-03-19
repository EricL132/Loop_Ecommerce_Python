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
    
    //Specific products page only has one array of the products
    //Goes to if statement if addingfrom product page
    //else looks through object to find item with correct id
    if (!Array.isArray(products[0])) {
        product = [products[item]]
    } else {
        if (Array.isArray(products[item])) {
            product = products[item].filter((item) => {
                return item.id === parseInt(id)
            })
        }else{
            product=products
        }

    }

    //filter above returns an array so the correct item is on the first index
    product = product[0]
    //Adds item to cart and updates localstorage with infomation
    if (cart && Object.keys(cart).length>0) {
        for (var i of Object.keys(cart)) {
            if (cart[i].id === product.id) {
                if (product.stock !== cart[i].quantity) {
                    cart[i].quantity++;
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
                break;
            }
            if (i === Object.keys(cart)[Object.keys(cart).length - 1]) {
                product.quantity = 1
                cart[parseInt(i) + 1] = product
                localStorage.setItem("cart", JSON.stringify(cart))
                break;
            }
        }

    } else {
        product.quantity = 1
        localStorage.setItem("cart", JSON.stringify({ "0": product }))
    }
    updateCartInfo(dispatch)
    dispatch(showCartInfo('REVERSE_CARTINFO'))
}