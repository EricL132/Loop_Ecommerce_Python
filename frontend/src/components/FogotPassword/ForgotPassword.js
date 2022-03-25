import "./ForgotPassword.css"
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

export default function ForgotPassword() {
    const [formInfo, setFormInfo] = useState({
        email: "",
    })
    const [errorMessage, setErrorMessage] = useState()
    const resetButtonEle = useRef()
    const fieldEle = useRef()
    function Reset(e) {
        e.preventDefault()
        setErrorMessage()

        for (var i in formInfo) {
            if (!formInfo[i]) return setErrorMessage("Invalid Login Info")
        }
        if (!formInfo["email"].includes(".") || !formInfo["email"].includes("@")) return setErrorMessage("Invalid email")
        fieldEle.current.disabled = true
        resetButtonEle.current.classList = "reset_button_disabled"
        fetch("/api/forgot", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formInfo) }).then((res) => {
            if (!res.ok) {
                fieldEle.current.disabled = false
                resetButtonEle.current.classList = "reset_button"
            }
            return res.json()
        }).then((data) => {
            if(data?.error){
                return setErrorMessage(data.error)
            }
            setErrorMessage(data.message)
        })
    }

    function changeInfo(e) {
        setFormInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    return (
        <div >
            <form id="login_container" onChange={changeInfo}>

                <h1 id="login_h1">Forgot Password <Link to="/account/login"><button id="register">Login</button></Link></h1>
                <fieldset id="forgot_field_set" ref={fieldEle}>
                    <input id="email" className="login_input" placeholder="Email"></input>
                    <button className="reset_button" onClick={Reset} ref={resetButtonEle}>Reset</button>
                    <span className="login_error">{errorMessage}</span>
                </fieldset>
            </form>

        </div>
    )
}