import { useCallback, useEffect, useState, React, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import ReactDOM from 'react-dom'
import "./CheckOutPage.css"
import { Link } from 'react-router-dom'
import { useHistory } from "react-router"
import { showCartInfo } from "../../redux/actions"
import updateCartInfo from "../utils/updateCartInfo"
export default function CheckOutPage() {
    const cartInfo = useSelector(state => state.cartReducer.cart)
    const loggedIn = useSelector(state => state.loggedReducer)
    const [subTotal, setSubTotal] = useState(0)
    const dispatch = useDispatch()
    const paypal = useRef()
    const [coupon, setCoupon] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [couponApplied, setCouponApplied] = useState()
    const [discountTotal, setDiscountTotal] = useState()
    const [total, setTotal] = useState()
    const [customerInfo, setCustomerInfo] = useState({
        first_name:"",
        last_name:"",
        email: "",
        address: "",
        zip: "",
        city: "",
        state: "AL"
    })
    const history = useHistory()
    const [paymentError, setPaymentError] = useState()
    const [InPayment, setInPayment] = useState()
    const [checkedOut,setCheckedOut] = useState()
    const [pageLoaded,setPageLoaded] = useState(false)
    const updateSubTotal = useCallback(() => {
        let total = 0
        Object.entries(cartInfo).map((item) => {
            return total += (item[1].quantity * item[1].price)
        })
        setSubTotal(total)
        setTotal(total + (total * .08))
       
    }, [cartInfo])

    function applyCoupon() {
        setErrorMessage()
        fetch(`/api/coupon/?code=${coupon}`).then(async res => {
            if (res.ok) {
                const code = await res.json()
                document.getElementById("total_amount").style.textDecoration = "line-through"
                setDiscountTotal(total - (total * (code.discount / 100)))
                setCouponApplied(code.discount)
            } else {
                setErrorMessage(await res.text())
            }
        })
    }
    function couponChange(e) {
        setCoupon(e.target.value)
    }

    function cancelCoupon() {
        setDiscountTotal()
        document.getElementById("total_amount").style.textDecoration = ""
        setCouponApplied()
    }
    function ValidateCheckOut() {
        setPaymentError()
        for (let i in customerInfo) {
            if (customerInfo[i] === "") {
                setPaymentError("Please Fill Out All Contact/Shipping Info")
                return false
            }
        }
        document.getElementById("payment_button").style.display = "none"
        document.getElementsByClassName("paypal_container")[0].style.height = "300px"
        setInPayment(true)
    }

    function changeCustomerInfo(e) {
        setCustomerInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    function handleEditCart() {
        history.push("/")
    }
    useEffect(() => {
        if (cartInfo) {
            updateSubTotal()
        }else{
            
            if(!checkedOut && pageLoaded){
                history.push("/")
            }
            
        }
        setPageLoaded(true)
    }, [cartInfo, updateSubTotal])

    useEffect(() => {
        if (InPayment) {


            const Button = window.paypal.Buttons({
                createOrder: function (data, actions) {
                    /* const stockCheck = checkCartStock()
                    console.log(stockCheck)
                    if (discountTotal && stockCheck) {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: discountTotal,
                                    },
                                },
                            ],
                        });
                    } else {
                        if (stockCheck) {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: total,
                                        },
                                    },
                                ],
                            });
                        }

                    } */
                    if(couponApplied){
                        customerInfo["coupon"] = coupon
                    }
                    customerInfo["cart"] = cartInfo
                    return fetch('/api/createorder', {
                        method: 'post', headers: { "content-type": "application/json" }, body: JSON.stringify(customerInfo)
                    }).then(function (res) {
                        return res.json();
                    }).then(function (orderData) {
                        if (orderData.status===false) {
                            localStorage.setItem("cart", JSON.stringify(orderData.cart))
                            updateCartInfo(dispatch)
                            history.push("/")
                            return false
                        }
                        return orderData.id;
                    });


                },

                onApprove: function (data, actions) {
                    /* return actions.order.capture().then((details) => {
                        setCustomerInfo(prev => ({ ...prev, ["details"]: details }))
                        setCustomerInfo(prev => ({ ...prev, ["cart"]: cartInfo }))
                        setCheckout(true)
                    }) */
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
            })
            Button.render(paypal.current)
            return () => Button.close()
        }
    }, [discountTotal, total, InPayment,couponApplied])


    async function checkCartStock() {
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

    function closeCart(){
        dispatch(showCartInfo())
    }
    return (
        <>

            <div className="main mid-container checkout_mid">
                <div className="right_side_container">
                    <div className="customer_info_container">
                        <h1 className="shipping_header">Contact Infomation {!loggedIn ? <Link to="/account/login" onClick={closeCart}><button className="account_button" >Have an Account?</button></Link> : null}</h1>
                        <form onChange={changeCustomerInfo} className="checkout_form" spellCheck="false">
                            <input id="email" autoComplete="new-password" className="checkout_inputs" placeholder="Email" ></input>
                            <h1 className="shipping_header">Shipping Infomation</h1>
                            <input id="first_name" autoComplete="new-password" className="smaller_checkout_inputs checkout_inputs " placeholder="First Name"></input>
                            <input id="last_name" autoComplete="new-password" className="smaller_checkout_inputs checkout_inputs " placeholder="Last Name"></input>

                            <input id="address" autoComplete="new-password" className="checkout_inputs" placeholder="Address" ></input>
                            <input id="zip" autoComplete="new-password" className=" smaller_checkout_inputs checkout_inputs " placeholder="Zip"></input>
                            <input id="city" autoComplete="new-password" className="smaller_checkout_inputs checkout_inputs" placeholder="City"></input>
                            <select id="state" className="state_select" >
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </form>

                    </div>
                    <div className="paypal_container" >
                        <div className="buttons_container" ref={paypal}>
                        </div>
                        <div id="payment_button">
                            <button className="payment_options_button" onClick={ValidateCheckOut}>Continue To Payment</button>
                        </div>
                        <span className="payment_error">{paymentError}</span>

                    </div>
                </div>

                <div className="order_summary_container">
                    <h1 className="shipping_header summary_header">Order Summary <button onClick={handleEditCart} className="account_button">Edit Cart</button></h1>
                    {cartInfo ?
                        <>
                            {Object.entries(cartInfo).map((item, i) => {
                                return <div key={i} className="checkout_product_container cartInfo-product-container">
                                    <div className="middle-row">
                                        <img className="checkout_image" alt="" src={item[1].image}></img>
                                        <div className="checkout_info_container">
                                            <span className="product-name">{item[1].name}</span>
                                            <span style={{ display: "block" }}>{item[1].size}</span>
                                            <div item={item[1].id} className="product-row">
                                                <span className="checkout_product_quantity">{item[1].quantity}x{item[1].price}</span>
                                                <span className="checkout_item_total">${(item[1].quantity * item[1].price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })}
                            < div className="summary_bottom_container">
                                <h3>Items: {Object.keys(cartInfo).length}</h3>
                                <h3>Subtotal: ${subTotal}</h3>
                                <h3 >Total:<span id="total_amount"> ${total}</span> {discountTotal ?
                                    <span>${discountTotal.toFixed(2)}</span>
                                    : null} </h3>
                                <div className="coupon_container">
                                    {!couponApplied ?
                                        <>
                                            <input spellCheck="false" placeholder="Coupon or Discount Code" onChange={couponChange}></input>
                                            <button onClick={applyCoupon}>Apply</button>
                                            <span className="coupon_error">{errorMessage}</span>
                                        </>
                                        :
                                        <>
                                            <span>{couponApplied}% Coupon Applied</span>
                                            <button onClick={cancelCoupon}>Cancel</button>
                                        </>}

                                </div>
                            </div>
                        </>
                        : null}


                </div>
            </div >
        </>
    )
}


