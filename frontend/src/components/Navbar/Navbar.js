import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCartInfo, LoggedIn,screenWidth } from '../../redux/actions/index'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import updateCartInfo from '../utils/updateCartInfo'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
    const bagNum = useSelector(state => state.bagCountReducer)
    const userLoggedIn = useSelector(state => state.loggedReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const width = useSelector(state=>state.screenWidth)
    useEffect(() => {
        function handleResize() {
            dispatch(screenWidth(window.innerWidth))
        }
        dispatch(screenWidth(window.innerWidth))
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);
    
    function handleSearchOverlay(e) {
        const current = document.getElementById("background-overlay").style.display

        if (current === "block") {
            if (e.target.id === "background-overlay" || e.target.id === "close-background-overlay-button" || e.key === "Enter") {
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
    function goToKids() {
        if (!window.location.pathname.includes("pages")) {
            history.push("/pages/kids/sneakers")
        } else {
            history.push("/pages/kids/sneakers")
            window.location.reload()
        }

    }
    function goToHome() {
        history.push("/")
    }




    function handleSearch(e) {

        if (e.key === "Enter") {
            handleSearchOverlay(e)
            const v = e.target.value
            e.target.value = ""
            if (!window.location.pathname.includes("search")) {
                history.push(`/pages/search/?search=${v}`)
            } else {
                history.push(`/pages/search/?search=${v}`)
                window.location.reload()

            }

        }
    }
    useEffect(() => {
        function checkAccount() {
            fetch("/api/account").then((res) => {
                if (res.ok) {
                    dispatch(LoggedIn())
                }
            })
        }
        checkAccount()
        updateCartInfo(dispatch)
    }, [dispatch])

 

    return (
        <>
            <header id="nav-header">
                <h1 onClick={goToHome}>Loop</h1>
                <div id="nav-pages-container">
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }} onClick={goToMens}>Men</button>
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }} onClick={goToWomens}>Women</button>
                    <button className="nav-buttons nav-buttons-underline" style={{ fontWeight: "bold" }} onClick={goToKids}>Kids</button>
                </div>

                {width > 600 ?
                    <div id="nav-left-container">
                        <button className="nav-buttons nav-buttons-underline" onClick={handleSearchOverlay}>Search</button>
                        {userLoggedIn ?
                            <Link to="/account/info"><button className="nav-buttons nav-buttons-underline">Account</button></Link>
                            : <Link to="/account/login"><button className="nav-buttons nav-buttons-underline">Account</button></Link>}

                        <button className="nav-buttons nav-buttons-underline" onClick={() => dispatch(showCartInfo('REVERSE_CARTINFO'))}>Bag ({bagNum})</button>
                    </div> : <div className="dropdown">
                        <button className="dropbtn">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="dropdown-content">
                            <button className="nav-buttons nav-buttons-underline" onClick={handleSearchOverlay} style={{color:'black'}}>Search</button>
                            {userLoggedIn ?
                                <Link to="/account/info"><button className="nav-buttons nav-buttons-underline" style={{color:'black'}}>Account</button></Link>
                                : <Link to="/account/login"><button className="nav-buttons nav-buttons-underline" style={{color:'black'}}>Account</button></Link>}
                            <button className="nav-buttons nav-buttons-underline" onClick={() => dispatch(showCartInfo('REVERSE_CARTINFO'))} style={{color:'black'}}>Bag ({bagNum})</button>
                        </div>
                    </div>}




                <div id="background-overlay" onMouseDown={handleSearchOverlay}>
                    <div id="search-header">
                        <input placeholder="Search..." onKeyDown={handleSearch}></input>
                        <button id="close-background-overlay-button" className="nav-buttons nav-buttons-underline" onClick={handleSearchOverlay}>Close</button>
                    </div>
                </div>
            </header>


        </>
    )
}



