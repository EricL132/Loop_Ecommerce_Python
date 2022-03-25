import "./ResetPage.css"
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

export default function ResetPage(props) {
    const [formInfo, setFormInfo] = useState({
        password: "",
        cpassword: ""
    })
    const [errorMessage, setErrorMessage] = useState()
    const history = useHistory()
    const [token,setToken] = useState()
    const fieldEle = useRef()
    const resetButtonEle = useRef()
    function Reset(e) {
        e.preventDefault()
        setErrorMessage()
        for (var i in formInfo) {
            if (!formInfo[i]) return setErrorMessage("Invalid Login Info")
        }
        if(formInfo["password"].length<6) return setErrorMessage("Password must be at least 6 characters")
        if(formInfo["password"]!==formInfo["cpassword"]) return setErrorMessage("Password and Confirm password must be the same")
        fieldEle.current.disabled = true
        resetButtonEle.current.classList = "reset_button_disabled"
        fetch(`/api/reset/${token}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formInfo) }).then((res) => {
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
    function getToken(){
        const token = props.match.params.token
        if(token){
            setToken(token)
        }else{
            history.push("/")
        }
    }
    function changeInfo(e) {
        setFormInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    useEffect(()=>{
        getToken()
    },[])
    return (
        <div>


            <form id="login_container" onChange={changeInfo}>

                <h1 id="login_h1">Reset<Link to="/account/login"><button id="register">Login</button></Link></h1>
                <fieldset id="forgot_field_set" ref={fieldEle}>
                    <input id="password" type="password" className="login_input" placeholder="Password"></input>
                    <input id="cpassword" type="password" className="login_input" placeholder="Confirm password"></input>

                    <button className="reset_button" onClick={Reset} ref={resetButtonEle}>Change</button>
                    <span className="login_error">{errorMessage}</span>
                </fieldset>
            </form>

        </div>
    )
}