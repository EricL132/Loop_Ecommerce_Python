import { useEffect, useState } from "react"
import "./AccountsPage.css"
import { useHistory } from 'react-router'
import {useDispatch}  from 'react-redux'
import {LoggedIn} from '../../redux/actions/index'
import RightCartInfo from "../RightCartInfo/RightCartInfo"
export default function AccountPage() {
    const history = useHistory()
    const [userInfo, setUserInfo] = useState()
    const dispatch = useDispatch()
    function getInfo() {
        fetch("/api/info").then((res) => res.json()).then((data) => {
            setUserInfo(data[0])
        })
    }
    function logOut() {
        fetch("/api/logout", { method: "POST" }).then(() => {
            dispatch(LoggedIn())
            history.push("/")
        })
    }
    useEffect(() => {
        getInfo()
    }, [])
    return (
        <>
        <div className="main account_mid_container">
            <h1 className="account_header">My Account<button id="logout" onClick={logOut}>Log Out</button></h1>
            {userInfo ?
                <span>{userInfo.first_name} {userInfo.last_name}</span>
                : null}
            <div className="order_history_container">
                <h5 className="account_order_header">Order History</h5>
                <table className="order_table">
                    <tr className="first_row">
                        <th>Order#</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Fulfillment Status</th>
                        <th>Total</th>
                    </tr>
                </table>
            </div>
        </div>
        <RightCartInfo></RightCartInfo>
        </>
    )
}