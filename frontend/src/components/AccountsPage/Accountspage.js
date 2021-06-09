import { useEffect } from "react"
import "./AccountsPage.css"
export default function AccountPage(){
    function getInfo(){
        fetch("/api/info")
    }

    useEffect(()=>{
        getInfo()
    },[])
    return(
        <div className="main account_mid_container">
            <h1 className="account_header">My Account</h1>
            <div className="order_history_container">
                <h5 className="account_order_header">Order History</h5>
            </div>
        </div>
    )
}