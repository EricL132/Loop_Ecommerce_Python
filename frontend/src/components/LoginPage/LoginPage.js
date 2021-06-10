import "./LoginPage.css"
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useHistory} from 'react-router'
import {useDispatch} from 'react-redux'
import {LoggedIn} from '../../redux/actions/index'
export default function LoginPage() {
    const [formInfo,setFormInfo] = useState({
        email:"",
        password:""
    })
    const [errorMessage,setErrorMessage] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    function login(e){
        e.preventDefault()
        setErrorMessage("")
        for(var i in formInfo){
            if(!formInfo[i]) return setErrorMessage("Invalid Login Info")
        }
        if(!formInfo["email"].includes(".") || !formInfo["email"].includes("@")) return setErrorMessage("Invalid email")
        if(formInfo["password"].length<6) return setErrorMessage("Invalid Password")
        fetch("/api/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(formInfo)}).then((res)=>{
            if(res.ok) {
                dispatch(LoggedIn())
                history.push("/account/info")
            }
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
                <h1 id="login_h1">Login <Link to="/account/register"><button id="register">Register</button></Link></h1>
                <input id="email" className="login_input" placeholder="Email"></input>
                <input id="password" type="password" className="login_input" placeholder="Password"></input>
                <button id="forgotpass">Forgot Password?</button>
                <button id="signin" onClick={login}>SIGN IN</button>
                <span className="login_error">{errorMessage}</span>
            </form>
        </div>
    )
}