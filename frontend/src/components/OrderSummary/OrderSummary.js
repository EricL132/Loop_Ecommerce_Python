import { useEffect, useState } from "react"
import "./OrderSummary.css"
import { Link } from "react-router-dom"
export default function OrderSummary(props) {
    const [orderInfo, setOrderInfo] = useState()
    const [orderid, setorderid] = useState()
    const [date, setDate] = useState()
    function getOrderInfo() {
        fetch(`/api/order/${props.match.params.id}`).then(res => res.json()).then(data => {
            setOrderInfo(data)
            setorderid(props.match.params.id)
            const date = new Date(data.shipping_info.date_added);
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            setDate([monthNames[date.getMonth()], date.getUTCDate(), date.getFullYear()])

        })
    }
    useEffect(() => {
        getOrderInfo()
    }, [])
    return (
        <>
            {
                orderInfo ?
                <>
                    <div className="main mid-container order_mid">


                        < h1 className="heading" > Order Summary</h1 >
                        <h3 className="order_number_heading">Order #{orderid}</h3>
                        <div className="info_container">
                            <div className="top_container">
                                <div className="left_container">
                                    <div className="semi_info_container">
                                        <label className="info_label">Date Placed</label>
                                        {date ?
                                            <span className="info_span">{date[0]} {date[1]}, {date[2]}</span>

                                            : null}
                                    </div>
                                    <div className="semi_info_container">
                                        <label className="info_label">Order Total</label>
                                        <span className="info_span">  ${orderInfo.total}</span>
                                    </div>
                                </div>

                                <div className="semi_info_container shipping_info">

                                    <label className="info_label" >Shipping Address</label>
                                    <span className="address_span" style={{ marginTop: "15px" }}>{orderInfo.shipping_info.address}</span>
                                    <span className="address_span">{orderInfo.shipping_info.city}, {orderInfo.shipping_info.state} {orderInfo.shipping_info.zipcode}</span>

                                </div>

                            </div>


                            <div className="products_table">
                                <table className="info_table">
                                    <tbody>
                                        <tr className="info_rows">
                                            <th className="table_info_head item_header">Items</th>
                                            <th className="table_info_head desc_table">Description</th>
                                            <th className="table_info_head">Qty</th>
                                            <th className="table_info_head">Size</th>
                                            <th className="table_info_head">Price</th>
                                        </tr>
                                        {orderInfo.order_info.map((product,i) => {
                                            return <tr key={i}>
                                                <td>
                                                    <Link to={`/pages/product/${product.product_id.productID}`}><img className="info_image" src={product.product_id.image}></img></Link>
                                                </td>
                                                <td className="desc_rowd">{product.product_id.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.product_id.size}</td>
                                                <td>${product.product_id.price}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div >

                    </>
                    : null
            }
        </>
    )
}