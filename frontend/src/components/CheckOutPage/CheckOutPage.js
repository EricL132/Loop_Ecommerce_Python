import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./CheckOutPage.css"
export default function CheckOutPage() {
    const cartInfo = useSelector(state => state.cartReducer)
    const loggedIn = useSelector(state => state.loggedReducer)
    const [subTotal, setSubTotal] = useState(0)

    const updateSubTotal  = useCallback(()=> {
        let total = 0
        Object.entries(cartInfo).map((item) => {
            return total += (item[1].quantity * item[1].price)
        })
        setSubTotal(total)
        
    },[cartInfo])
    useEffect(()=>{
        updateSubTotal()
    },[cartInfo,updateSubTotal])
    return (
        <div className="main mid-container checkout_mid">
            <div className="right_side_container">
                <div className="customer_info_container">
                    <h1 className="shipping_header">Contact Infomation {!loggedIn ? <button className="account_button">Have an Account?</button> : null}</h1>
                    <input id="email" className="checkout_inputs" placeholder="Email" style={{ marginTop: "0px" }}></input>
                    <h1 className="shipping_header">Shipping Infomation</h1>
                    <input id="address" className="checkout_inputs" placeholder="Address" style={{ marginTop: "0px" }}></input>
                    <input id="city" className="smaller_checkout_inputs checkout_inputs" placeholder="City"></input>
                    <input id="state" className=" smaller_checkout_inputs checkout_inputs " placeholder="State"></input>
                    <input id="zip" className=" smaller_checkout_inputs checkout_inputs " placeholder="Zip"></input>
                </div>
                <div className="paypal_container">

                </div>
            </div>

            <div className="order_summary_container">
                <h1 className="shipping_header summary_header">Order Summary <button className="account_button">Edit Cart</button></h1>
                {cartInfo ?
                    Object.entries(cartInfo).map((item, i) => {
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

                    })

                    : null}
                <div className="summary_bottom_container">
                    <h3>Items: {Object.keys(cartInfo).length}</h3>
                    <h3>Subtotal: ${subTotal}</h3>
                    <h3>Total: ${subTotal+(subTotal*.08)}</h3>
                </div>

            </div>
        </div>
    )
}