import "./RegisterPage.css"
import {Link} from 'react-router-dom'
import { useState } from "react"
import {useHistory} from 'react-router'
export default function RegisterPage() {
    const [formInfo,setFormInfo] = useState({
        fname:"",
        lname:"",
        email:"",
        password:""
    })
    const [errorMessage,setErrorMessage] = useState()
    const history = useHistory()
    function register(e){
        e.preventDefault()
        setErrorMessage("")
        for(var i in formInfo){
            if(!formInfo[i]) return setErrorMessage("Please fill out all info")
        }
        if(!formInfo["email"].includes(".") || !formInfo["email"].includes("@")) return setErrorMessage("Invalid email")
        if(formInfo["password"].length<6) return setErrorMessage("Password must be at least 6 characters")
        fetch("/api/register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(formInfo)}).then((res)=>{
            if(res.ok) history.push("/account/info")
            return res.text()
        }).then((data)=>{
            setErrorMessage(data)
        })
    }  

    function changeInfo(e){
        setFormInfo((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    return (
        <div className="main">
            <form id="login_container" onChange={changeInfo}>
                <h1 id="login_h1">Register <Link to="/account/login"><button id="register">Login</button></Link></h1>
                <input id="fname" className="login_input" placeholder="First name"></input>
                <input id="lname" className="login_input" placeholder="Last name"></input>
                <input id="email" className="login_input" placeholder="Email"></input>
                <input id="password" type="password" className="login_input" placeholder="Password"></input>
                <button id="signin" onClick={register}>REGISTER</button>
                <span className="login_error">{errorMessage}</span>
            </form>
        </div>
    )
}