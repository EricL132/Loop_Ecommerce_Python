import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { LoggedIn } from "../../redux/actions/index";
export default function LoginPage() {
    const [formInfo, setFormInfo] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    function login(e) {
        e.preventDefault();
        setErrorMessage("");
        for (var i in formInfo) {
            if (!formInfo[i]) return setErrorMessage("Invalid Login Info");
        }
        if (!formInfo["email"].includes(".") || !formInfo["email"].includes("@"))
            return setErrorMessage("Invalid email");
        if (formInfo["password"].length < 6) return setErrorMessage("Invalid Password");
        fetch("/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formInfo),
        })
            .then((res) => {
                if (res.ok) {
                    dispatch(LoggedIn());
                    history.push("/account/info");
                }
                return res.text();
            })
            .then((data) => {
                setErrorMessage(data);
            });
    }

    function changeInfo(e) {
        setFormInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    function submitHandler(e) {
        e.preventDefault();
    }
    return (
        <div className="main">
            <div id="login_container">
                <div className="login-header">
                    <h1 id="login_h1">
                        Login{" "}
                        <Link to="/account/register">
                            <button id="register">Register</button>
                        </Link>
                    </h1>
                </div>
                <form onChange={changeInfo} onSubmit={submitHandler}>
                    <input
                        id="email"
                        className="login_input"
                        autocomplete="off"
                        placeholder="Email"
                    ></input>
                    <input
                        id="password"
                        type="password"
                        className="login_input"
                        placeholder="Password"
                    ></input>
                    <button id="signin" onClick={login}>
                        SIGN IN
                    </button>
                    <Link to="/account/forgot">
                        <button id="forgotpass">Forgot Password?</button>
                    </Link>
                    <span className="login_error">{errorMessage}</span>
                </form>
            </div>
        </div>
    );
}
