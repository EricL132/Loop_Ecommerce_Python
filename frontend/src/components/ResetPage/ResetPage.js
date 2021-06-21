import "./ResetPage.css"
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { LoggedIn } from '../../redux/actions/index'

export default function ResetPage(props) {
    const [formInfo, setFormInfo] = useState({
        password: "",
        cpassword: ""
    })
    const [errorMessage, setErrorMessage] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    const [token,setToken] = useState()
    function Reset(e) {
        e.preventDefault()
        setErrorMessage()
        const field = document.getElementById("forgot_field_set")
        const button = document.getElementsByClassName("reset_button")[0]
        for (var i in formInfo) {
            if (!formInfo[i]) return setErrorMessage("Invalid Login Info")
        }
        if(formInfo["password"].length<6) return setErrorMessage("Password must be at least 6 characters")
        if(formInfo["password"]!==formInfo["cpassword"]) return setErrorMessage("Password and Confirm password must be the same")
        field.disabled = true
        button.classList = "reset_button_disabled"
        fetch(`/api/reset/${token}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formInfo) }).then((res) => {
            if (!res.ok) {
                field.disabled = false
                button.classList = "reset_button"
            }
            return res.text()
        }).then((data) => {
            setErrorMessage(data)
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
        <div className="main">


            <form id="login_container" onChange={changeInfo}>

                <h1 id="login_h1">Reset<Link to="/account/login"><button id="register">Login</button></Link></h1>
                <fieldset id="forgot_field_set">
                    <input id="password" type="password" className="login_input" placeholder="Password"></input>
                    <input id="cpassword" type="password" className="login_input" placeholder="Confirm password"></input>

                    <button className="reset_button" onClick={Reset}>Change</button>
                    <span className="login_error">{errorMessage}</span>
                </fieldset>
            </form>

        </div>
    )
}