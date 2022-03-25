import { useEffect, useState } from "react";
import "./AccountsPage.css";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LoggedIn } from "../../redux/actions/index";
import { Link } from "react-router-dom";
export default function AccountPage() {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState();
    const dispatch = useDispatch();
    const width = useSelector((state) => state.screenWidth);
    function getInfo() {
        fetch("/api/info")
            .then((res) => res.json())
            .then((data) => {
                setUserInfo(data);
            });
    }
    function logOut() {
        fetch("/api/logout", { method: "POST" }).then(() => {
            dispatch(LoggedIn());
            history.push("/");
        });
    }
    useEffect(() => {
        getInfo();
    }, []);
    return (
        <>
            <div className="main account_mid_container">
                <h1 className="account_header">
                    My Account
                    <button id="logout" onClick={logOut}>
                        Log Out
                    </button>
                </h1>
                {userInfo ? (
                    <>
                        <span>
                            {userInfo.first_name} {userInfo.last_name}
                        </span>

                        <div className="order_history_container">
                            <h5 className="account_order_header">Order History</h5>
                            <table className="order_table">
                                <tbody>
                                    <tr className="first_row">
                                        <th>Order#</th>
                                        {width > 600 ? (
                                            <>
                                                <th>Date</th>
                                                <th>Payment Status</th>
                                                <th>Fulfillment Status</th>
                                                <th>Total</th>
                                            </>
                                        ) : null}
                                    </tr>
                                    {userInfo.hasOwnProperty("order") ? (
                                        <>
                                            {userInfo.order.map((order) => {
                                                return (
                                                    <tr key={order.transaction_id}>
                                                        <td className="order_history_td">
                                                            <Link
                                                                to={`/order/${order.transaction_id}`}
                                                            >
                                                                {order.transaction_id}
                                                            </Link>
                                                        </td>

                                                        {width > 600 ? (
                                                            <>
                                                                <td className="order_history_td">
                                                                    {
                                                                        order.date_ordered.split(
                                                                            "T"
                                                                        )[0]
                                                                    }
                                                                </td>
                                                                <td className="order_history_td">
                                                                    {order.status}
                                                                </td>
                                                                <td className="order_history_td">
                                                                    Delivered
                                                                </td>
                                                                <td className="order_history_td">
                                                                    ${order.total}
                                                                </td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}
