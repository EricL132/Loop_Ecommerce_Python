import "./ForgotPassword.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { LoggedIn } from '../../redux/actions/index'

export default function ForgotPassword() {
    const [formInfo, setFormInfo] = useState({
        email: "",
    })
    const [errorMessage, setErrorMessage] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    function Reset(e) {
        e.preventDefault()
        setErrorMessage()
        const field = document.getElementById("forgot_field_set")
        const button = document.getElementsByClassName("reset_button")[0]
        for (var i in formInfo) {
            if (!formInfo[i]) return setErrorMessage("Invalid Login Info")
        }
        if (!formInfo["email"].includes(".") || !formInfo["email"].includes("@")) return setErrorMessage("Invalid email")
        field.disabled = true
        button.classList = "reset_button_disabled"
        fetch("/api/forgot", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formInfo) }).then((res) => {
            if (!res.ok) {
                field.disabled = false
                button.classList = "reset_button"
            }
            return res.text()
        }).then((data) => {
            setErrorMessage(data)
        })
    }

    function changeInfo(e) {
        setFormInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    return (
        <div className="main">


            <form id="login_container" onChange={changeInfo}>

                <h1 id="login_h1">Forgot Password <Link to="/account/login"><button id="register">Login</button></Link></h1>
                <fieldset id="forgot_field_set">
                    <input id="email" className="login_input" placeholder="Email"></input>
                    <button className="reset_button" onClick={Reset}>Reset</button>
                    <span className="login_error">{errorMessage}</span>
                </fieldset>
            </form>

        </div>
    )
}