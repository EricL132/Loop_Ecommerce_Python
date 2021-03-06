import { useCallback, useEffect, useState, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CheckOutPage.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { showCartInfo } from "../../redux/actions";
import updateCartInfo from "../utils/updateCartInfo";
import createPaypalCheckout from "../utils/createPaypalCheckout";
import confirmPaypalCheckout from "../utils/confirmPaypalCheckout";
export default function CheckOutPage() {
    const cartInfo = useSelector((state) => state.cartReducer.cart);
    const loggedIn = useSelector((state) => state.loggedReducer);
    const [subTotal, setSubTotal] = useState(0);
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [couponApplied, setCouponApplied] = useState();
    const [discountTotal, setDiscountTotal] = useState();
    const [total, setTotal] = useState();
    const [customerInfo, setCustomerInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        zip: "",
        city: "",
        state: "AL",
    });
    const history = useHistory();
    const [paymentError, setPaymentError] = useState();
    const [InPayment, setInPayment] = useState();
    const [checkedOut, setCheckedOut] = useState();
    const [pageLoaded, setPageLoaded] = useState(false);
    const totalAmountEle = useRef();
    const paypal = useRef();
    const paypalButtonContainerEle = useRef();
    const paypalContainerEle = useRef();
    const updateSubTotal = useCallback(() => {
        let total = 0;
        Object.entries(cartInfo).map((item) => {
            return (total += item[1].quantity * item[1].price);
        });
        setSubTotal(total);
        setTotal(total + total * 0.08);
    }, [cartInfo]);

    function applyCoupon() {
        setErrorMessage();
        fetch(`/api/coupon/?code=${coupon}`)
            .then(async (res) => {
                if (res.ok) {
                    const code = await res.json();
                    totalAmountEle.current.style.textDecoration = "line-through";
                    setDiscountTotal(total - total * (code.discount / 100));
                    return setCouponApplied(code.discount);
                }
                return res.json();
            })
            .then((data) => {
                if (data?.error) {
                    return setErrorMessage(data.error);
                }
                setErrorMessage(data);
            });
    }
    function couponChange(e) {
        setCoupon(e.target.value);
    }

    function cancelCoupon() {
        setDiscountTotal();
        setCouponApplied();
        setCoupon();
        totalAmountEle.current.style.textDecoration = "";
    }
    function ValidateCheckOut() {
        setPaymentError();
        for (let i in customerInfo) {
            if (customerInfo[i] === "") {
                setPaymentError("Please Fill Out All Contact/Shipping Info");
                return false;
            }
        }
        paypalButtonContainerEle.current.style.display = "none";
        paypalContainerEle.current.style.height = "300px";
        setInPayment(true);
    }

    function changeCustomerInfo(e) {
        setCustomerInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    useEffect(() => {
        if (cartInfo) {
            updateSubTotal();
        } else {
            if (!checkedOut && pageLoaded) {
                history.push("/");
            }
        }
        setPageLoaded(true);
    }, [cartInfo, updateSubTotal]);

    useEffect(() => {
        if (InPayment) {
            const Button = window.paypal.Buttons({
                createOrder: function () {
                    return createPaypalCheckout(
                        couponApplied,
                        coupon,
                        cartInfo,
                        customerInfo,
                        updateCartInfo,
                        history
                    );
                },

                onApprove: function (data) {
                    return confirmPaypalCheckout(
                        data,
                        setCheckedOut,
                        updateCartInfo,
                        dispatch,
                        closeCart,
                        history
                    );
                },
            });
            Button.render(paypal.current);
            return () => Button.close();
        }
    }, [discountTotal, total, InPayment, couponApplied]);
    useEffect(() => {
        dispatch(showCartInfo("DONT_SHOW_CART"));
    }, []);
    function closeCart() {
        dispatch(showCartInfo("DONT_SHOW_CART"));
    }
    return (
        <>
            <div className="mid-container checkout_mid">
                <div className="right_side_container">
                    <div className="customer_info_container">
                        <h1 className="shipping_header">
                            Contact Infomation{" "}
                            {!loggedIn ? (
                                <Link to="/account/login" onClick={closeCart}>
                                    <button className="account_button">Have an Account?</button>
                                </Link>
                            ) : null}
                        </h1>
                        <form
                            onChange={changeCustomerInfo}
                            className="checkout_form"
                            spellCheck="false"
                        >
                            <input
                                id="email"
                                autoComplete="new-password"
                                className="checkout_inputs"
                                placeholder="Email"
                            ></input>
                            <h1 className="shipping_header">Shipping Infomation</h1>
                            <input
                                id="first_name"
                                autoComplete="new-password"
                                className="smaller_checkout_inputs checkout_inputs "
                                placeholder="First Name"
                            ></input>
                            <input
                                id="last_name"
                                autoComplete="new-password"
                                className="smaller_checkout_inputs checkout_inputs "
                                placeholder="Last Name"
                            ></input>

                            <input
                                id="address"
                                autoComplete="new-password"
                                className="checkout_inputs"
                                placeholder="Address"
                            ></input>
                            <input
                                id="zip"
                                autoComplete="new-password"
                                className=" smaller_checkout_inputs checkout_inputs "
                                placeholder="Zip"
                            ></input>
                            <input
                                id="city"
                                autoComplete="new-password"
                                className="smaller_checkout_inputs checkout_inputs"
                                placeholder="City"
                            ></input>
                            <select id="state" className="state_select">
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
                    <div className="paypal_container" ref={paypalContainerEle}>
                        <div className="buttons_container" ref={paypal}></div>
                        <div id="payment_button" ref={paypalButtonContainerEle}>
                            <button className="payment_options_button" onClick={ValidateCheckOut}>
                                Continue To Payment
                            </button>
                        </div>
                        <span className="payment_error">{paymentError}</span>
                    </div>
                </div>

                <div className="order_summary_container">
                    <h1 className="shipping_header summary_header">Order Summary</h1>
                    {cartInfo ? (
                        <>
                            {Object.entries(cartInfo).map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="checkout_product_container cartInfo-product-container"
                                    >
                                        <div className="middle-row">
                                            <img
                                                className="checkout_image"
                                                alt=""
                                                src={item[1].image}
                                            ></img>
                                            <div className="checkout_info_container">
                                                <span className="product-name">{item[1].name}</span>
                                                <span style={{ display: "block" }}>
                                                    {item[1].size}
                                                </span>
                                                <div item={item[1].id} className="product-row">
                                                    <span className="checkout_product_quantity">
                                                        {item[1].quantity}x{item[1].price}
                                                    </span>
                                                    <span className="checkout_item_total">
                                                        $
                                                        {(item[1].quantity * item[1].price).toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="summary_bottom_container">
                                <h3>Items: {Object.keys(cartInfo).length}</h3>
                                <h3>Subtotal: ${subTotal}</h3>
                                <h3>
                                    Total:
                                    <span id="total_amount" ref={totalAmountEle}>
                                        {" "}
                                        ${total}
                                    </span>{" "}
                                    {discountTotal ? (
                                        <span>${discountTotal.toFixed(2)}</span>
                                    ) : null}{" "}
                                </h3>
                                <div className="coupon_container">
                                    {!couponApplied ? (
                                        <>
                                            <input
                                                spellCheck="false"
                                                placeholder="Coupon or Discount Code"
                                                onChange={couponChange}
                                            ></input>
                                            <button onClick={applyCoupon}>Apply</button>
                                            <span className="coupon_error">{errorMessage}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{couponApplied}% Coupon Applied</span>
                                            <button onClick={cancelCoupon}>Cancel</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}
