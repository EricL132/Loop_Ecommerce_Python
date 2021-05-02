import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCart } from '../../redux/actions/index'
import { updateCart } from '../../redux/actions/index'
import {showCartInfo} from '../../redux/actions/index'
import RightCartInfo from '../RightCartInfo/RightCartInfo'
import './Homepage.css'


export default function HomePage(props) {
    const [products, setProducts] = useState()
    const showInfo = useSelector(state=>state.cartInfoReducer)
    const dispatch = useDispatch()
    function getProducts() {
        fetch('/api/products').then((res) => res.json()).then((data) => {
            setProducts(data.products)
        })
    }
    function addToCart(e) {
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
        props.updateCartInfo()
        dispatch(showCartInfo())
    }

    function closeOverlay(e) {
        if (e.target.id === "cartInfo-overlay" || e.target.id === "cartInfo-close")  {
            dispatch(showCartInfo())
        }

    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div id="all-product-container">
            {products ?
                products.map((product, i) => {
                    return <div key={i} className="product-container">
                        <img className="product-image" src={product.image}></img>
                        <div className="product-info-container">
                            <div className="product-info-add-container">
                                <h1 className="product-name">{product.name}</h1>
                                <button item={i} className="nav-buttons product-cart" onClick={addToCart}>Cart</button>
                            </div>

                            <span className="product-price">${product.price}</span>

                        </div>
                    </div>
                })

                : null}
            {showInfo ?
                <div id="cartInfo-overlay" onMouseDown={closeOverlay}>
                    <RightCartInfo updateCartInfo={props.updateCartInfo}></RightCartInfo>
                </div>
                : null}

        </div>
    )
}

export function getCartInfo() {
    return JSON.parse(localStorage.getItem("cart"))
}