import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCartInfo, LoggedIn } from '../../redux/actions/index'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import updateCartInfo from '../utils/updateCartInfo'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
    const cartInfo = useSelector(state => state.cartReducer)
    const bagNum = useSelector(state => state.bagCountReducer)
    const userLoggedIn = useSelector(state => state.loggedReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    function handleSearchOverlay(e) {
        const current = document.getElementById("background-overlay").style.display

        if (current === "block") {

            if (e.target.id === "background-overlay" || e.target.id === "close-background-overlay-button") {
                document.getElementById("search-header").classList.add("slideUpAni")
                setTimeout(() => {
                    document.getElementById("background-overlay").style.display = "none"
                    document.getElementById("search-header").classList.remove("slideUpAni")
                }, 400)



            }
        } else {
            document.getElementById("background-overlay").style.display = "block"
        }



    }

    function goToMens() {
        if (!window.location.pathname.includes("pages")) {
            history.push("/pages/men/sneakers")
        } else {
            history.push("/pages/men/sneakers")
            window.location.reload()
        }

    }
    function goToWomens() {
        if (!window.location.pathname.includes("pages")) {
            history.push("/pages/women/sneakers")
        } else {
            history.push("/pages/women/sneakers")
            window.location.reload()
        }

    }
    function goToHome() {
        history.push("/")
    }
    function checkAccount() {
        fetch("/api/account").then((res) => {
            if (res.ok) {
                dispatch(LoggedIn())
            }
        })
    }
    useEffect(() => {
        checkAccount()
        updateCartInfo(dispatch)
    }, [])
    return (
        <>
            <header id="nav-header">
                <h1 onClick={goToHome}>Loop</h1>
                <div id="nav-pages-container">
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }} onClick={goToMens}>Men</button>
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }} onClick={goToWomens}>Women</button>
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }}>Kids</button>
                </div>
                <div id="nav-left-container">
                    <button className="nav-buttons nav-buttons-underline" onClick={handleSearchOverlay}>Search</button>
                    {userLoggedIn ?
                        <Link to="/account/info"><button className="nav-buttons nav-buttons-underline">Account</button></Link>
                        : <Link to="/account/login"><button className="nav-buttons nav-buttons-underline">Account</button></Link>}

                    <button className="nav-buttons nav-buttons-underline" onClick={() => dispatch(showCartInfo())}>Bag ({bagNum})</button>
                </div>
                <div id="background-overlay" onMouseDown={handleSearchOverlay}>
                    <div id="search-header">
                        <input placeholder="Search..."></input>
                        <button id="close-background-overlay-button" className="nav-buttons nav-buttons-underline" onClick={handleSearchOverlay}>Close</button>
                    </div>
                </div>
            </header>


        </>
    )
}



