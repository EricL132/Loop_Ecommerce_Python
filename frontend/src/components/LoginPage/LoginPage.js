import "./LoginPage.css"
import {Link} from 'react-router-dom'

export default function LoginPage() {


    return (
        <div className="main">
            <form id="login_container">
                <h1 id="login_h1">Login <Link to="/account/register"><button id="register">Register</button></Link></h1>
                <input id="email" className="login_input" placeholder="Email"></input>
                <input id="password" type="password" className="login_input" placeholder="Password"></input>
                <button id="forgotpass">Forgot Password?</button>
                <button id="signin">SIGN IN</button>
            </form>
        </div>
    )
}