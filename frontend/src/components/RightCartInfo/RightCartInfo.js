import './RightCartInfo.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateCart, DecrementBagCount, IncrementBagCount, bagCount } from '../../redux/actions/index'
import { showCartInfo } from '../../redux/actions/index'
import updateCartInfo from '../utils/updateCartInfo'

export default function RightCartInfo() {
    const cartInfo = useSelector(state => state.cartReducer)
    const showInfo = useSelector(state => state.cartInfoReducer)

    const [subTotal, setSubTotal] = useState(0)
    const [errorMessage, setErrorMessage] = useState()
    const dispatch = useDispatch()
    let bagNum = useSelector(state => state.bagCountReducer)

    useEffect(() => {
        updateSubTotal()
    }, [cartInfo])
    function updateSubTotal() {
        setSubTotal(0)
        Object.entries(cartInfo).map((item) => {
            setSubTotal((subTotal) => subTotal + (item[1].quantity * item[1].price))
        })
    }
    function closeOverlay(e) {
        if (showInfo) {
            if (e.target.id === "cartInfo-overlay" || e.target.id === "cartInfo-close") {
                document.getElementById("left-container").classList.add("slideRightAni")
                setTimeout(() => {
                    document.getElementById("left-container").classList.remove("slideRightAni")
                    dispatch(showCartInfo())
                }, 400)

            }
        }


    }
    function IncrementItem(e) {
        setErrorMessage()
        const itemID = parseInt(e.target.parentNode.getAttribute("item"))
        for (var i = 0; i < Object.keys(cartInfo).length; i++) {
            if (cartInfo[i].id === itemID) {
                const newAmount = cartInfo[i].quantity + 1
                if (newAmount <= cartInfo[i].stock) {
                    cartInfo[i].quantity = newAmount
                    e.target.previousElementSibling.value = newAmount

                    dispatch(updateCart(cartInfo))
                    dispatch(IncrementBagCount())
                    localStorage.setItem("cart", JSON.stringify(cartInfo))

                } else {
                    setErrorMessage("Max quantity reached")
                }
            }

        }


    }

    function DecrementItem(e) {
        setErrorMessage()
        const itemID = parseInt(e.target.parentNode.getAttribute("item"))

        for (var i = 0; i < Object.keys(cartInfo).length; i++) {
            if (cartInfo[i].id === itemID) {
                const newAmount = cartInfo[i].quantity - 1
                if (newAmount <= cartInfo[i].stock) {
                    cartInfo[i].quantity = newAmount
                    e.target.nextElementSibling.value = newAmount
                    dispatch(updateCart(cartInfo))
                    dispatch(DecrementBagCount())
                    localStorage.setItem("cart", JSON.stringify(cartInfo))

                } else {
                    setErrorMessage("Max quantity reached")
                }
            }
        }

    }
    function changeQuantity(e) {
        if (e.code === "Enter") {
            e.target.blur()
        }
        if (e.type === 'blur') {
            setErrorMessage()
            const itemID = parseInt(e.target.parentNode.getAttribute("item"))

            for (var i = 0; i < Object.keys(cartInfo).length; i++) {
                if (cartInfo[i].id === itemID) {
                    const newAmount = parseInt(e.target.value)

                    if (newAmount <= cartInfo[i].stock) {
                        cartInfo[i].quantity = newAmount
                        localStorage.setItem("cart", JSON.stringify(cartInfo))
                        updateCartInfo(dispatch)

                    } else {
                        e.target.value = cartInfo[i].stock
                        cartInfo[i].quantity = cartInfo[i].stock
                        localStorage.setItem("cart", JSON.stringify(cartInfo))
                        updateCartInfo(dispatch)
                        setErrorMessage("Max quantity reached")
                    }
                }
            }
        }
    }

    function removeItem(){
        
    }
    return (
        <>
            {showInfo ?
                <div id="cartInfo-overlay" onMouseDown={closeOverlay}>
                    <div id="left-container">
                        <div className="top-row">
                            <h1>Shopping Cart</h1>
                            <button id="cartInfo-close" className="nav-buttons">Close</button>
                        </div>
                        <span className="error-span">{errorMessage}</span>
                        <div id="cartInfo-products-container">
                            {cartInfo ?
                                Object.entries(cartInfo).map((item, i) => {
                                    return <div key={i} className="cartInfo-product-container">
                                        <div className="middle-row">
                                            <img alt="" src={item[1].image}></img>
                                            <div className="cartInfo-info-container">
                                                <span className="product-name">{item[1].name}</span>
                                                <span style={{ display: "block" }}>{item[1].size}</span>
                                                <div item={item[1].id} className="product-row">
                                                    <button onClick={DecrementItem}>-</button>
                                                    <input className="product-quantity" type="number" defaultValue={item[1].quantity} onKeyDown={changeQuantity} onBlur={changeQuantity}></input>
                                                    <button onClick={IncrementItem}>+</button>
                                                    <span>${(item[1].quantity * item[1].price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                })

                                : null}
                        </div>
                        <div id="cartInfo-bottom-box">
                            <div id="subtotal">
                                <span>Subtotal</span>
                                <span id="subtotal-amount">${subTotal.toFixed(2)}</span>
                            </div>
                            <span id="shipping-text">{"Shipping & taxes calculated at checkout"}</span>
                            <button id="checkout-button">Checkout</button>
                        </div>

                    </div>

                </div>
                : null}
        </>
    )
}