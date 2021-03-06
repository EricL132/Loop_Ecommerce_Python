import './RightCartInfo.css'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useState } from 'react'
import { updateCart, DecrementBagCount, IncrementBagCount } from '../../redux/actions/index'
import { showCartInfo } from '../../redux/actions/index'
import updateCartInfo from '../utils/updateCartInfo'
import { Link } from 'react-router-dom'
export default function RightCartInfo() {
    const cartInfo = useSelector(state => state.cartReducer.cart)
    const showInfo = useSelector(state => state.cartInfoReducer)

    const [subTotal, setSubTotal] = useState(0)
    const [errorMessage, setErrorMessage] = useState()
    const leftContainerEle = useRef()
    const dispatch = useDispatch()
    let bagNum = useSelector(state => state.bagCountReducer)
    const updateSubTotal = useCallback(() => {
        setSubTotal(0)
        if (cartInfo) {
            Object.entries(cartInfo).map((item) => {
                return setSubTotal((subTotal) => subTotal + (item[1].quantity * item[1].price))
            })
        }
    }, [cartInfo])
    useEffect(() => {
        updateSubTotal()
    }, [bagNum, updateSubTotal])



    function closeOverlay(e) {
        if (showInfo) {
            if (e.target.id === "cartInfo-overlay" || e.target.id === "cartInfo-close") {

                
                leftContainerEle.current.classList.add("slideRightAni")
                setTimeout(() => {
                    dispatch(showCartInfo('DONT_SHOW_CART'))
                }, 400)



                removeQuantityZero()
            }
        }


    }
    function IncrementItem(e) {
        setErrorMessage()
        const itemID = parseInt(e.target.parentNode.getAttribute("item"))
        for (var i of Object.keys(cartInfo)) {
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
    function removeQuantityZero() {
        if (cartInfo) {
            for (var i of Object.keys(cartInfo)) {
                if (cartInfo[i].quantity === 0) {
                    delete cartInfo[i]
                    localStorage.setItem("cart", JSON.stringify(cartInfo))
                    updateCartInfo(dispatch)
                }
            }
        }

    }
    function DecrementItem(e) {
        setErrorMessage()
        const itemID = parseInt(e.target.parentNode.getAttribute("item"))

        for (var i of Object.keys(cartInfo)) {
            if (cartInfo[i].id === itemID) {
                const newAmount = cartInfo[i].quantity - 1
                if (newAmount === 0) {
                    delete cartInfo[i]
                    localStorage.setItem("cart", JSON.stringify(cartInfo))
                    updateCartInfo(dispatch)
                } else {
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

    }
    function changeQuantity(e) {
        if (e.code === "Enter") {
            e.target.blur()
        }
        if (e.type === 'blur') {
            setErrorMessage()
            const itemID = parseInt(e.target.parentNode.getAttribute("item"))
            for (var i of Object.keys(cartInfo)) {
                if (cartInfo[i].id === itemID) {
                    const newAmount = parseInt(e.target.value)
                    if (newAmount > 0) {
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
                    } else {
                        e.target.value = cartInfo[i].quantity
                    }



                }
            }
        }
    }
    function removeItem(e) {
        setErrorMessage()
        const itemID = parseInt(e.target.parentNode.getAttribute("item"))

        for (var i of Object.keys(cartInfo)) {
            if (cartInfo[i].id === itemID) {
                delete cartInfo[i]
                localStorage.setItem("cart", JSON.stringify(cartInfo))
                updateCartInfo(dispatch)
            }
        }
    }
    return (
        <>
            {showInfo ?
                <div id="cartInfo-overlay" onMouseDown={closeOverlay}>
                    <div id="left-container" ref={leftContainerEle}>
                        <div className="top-row">
                            <h1>Shopping Cart</h1>
                            <button id="cartInfo-close" className="nav-buttons">Close</button>
                        </div>
                        <span className="error-span">{errorMessage}</span>
                        <div id="cartInfo-products-container">
                            {cartInfo ?
                                Object.entries(cartInfo).map((item, i) => {
                                    if (item[1].quantity) {
                                        return <div key={i} className="cartInfo-product-container">
                                            <div className="middle-row">
                                                <img className="cart_image" alt="" src={item[1].image}></img>
                                                <div className="cartInfo-info-container">
                                                    <span className="product-name">{item[1].name}</span>
                                                    <span style={{ display: "block" }}>{item[1].size}</span>
                                                    <div item={item[1].id} className="product-row">
                                                        <button onClick={DecrementItem}>-</button>
                                                        <input className="product-quantity" type="number" defaultValue={item[1].quantity} onKeyDown={changeQuantity} onBlur={changeQuantity}></input>
                                                        <button onClick={IncrementItem}>+</button>
                                                        <button onClick={removeItem}>Remove Item</button>
                                                        <span className="cart_span">${(item[1].quantity * item[1].price).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    } else {
                                        return <div key={i} className="cartInfo-product-container">
                                            <div className="middle-row">
                                                <img className="cart_image" alt="" src={item[1].image}></img>
                                                <div className="cartInfo-info-container">
                                                    <span className="product-name">{item[1].name}</span>
                                                    <span style={{ display: "block" }}>{item[1].size}</span>
                                                    <div item={item[1].id} className="product-row">
                                                        <span className="out_of_stock_message">Item is out of stock and was removed from your cart</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }


                                })

                                : null}
                        </div>
                        {bagNum ?
                            <div id="cartInfo-bottom-box">
                                <div id="subtotal">
                                    <span>Subtotal</span>
                                    <span id="subtotal-amount">${subTotal.toFixed(2)}</span>
                                </div>
                                <span id="shipping-text">{"Shipping & taxes calculated at checkout"}</span>
                                <Link to="/pages/checkout"><button id="checkout-button">Checkout</button></Link>
                            </div>
                            : null}
    

                    </div>

                </div>
                : null}
        </>
    )
}
