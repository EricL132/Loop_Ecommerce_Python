import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { showCartInfo, LoggedIn, screenWidth } from "../../redux/actions/index";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import updateCartInfo from "../utils/updateCartInfo";
import { Link } from "react-router-dom";
export default function Navbar(props) {
    const bagNum = useSelector((state) => state.bagCountReducer);
    const userLoggedIn = useSelector((state) => state.loggedReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const width = useSelector((state) => state.screenWidth);
    const searchHeaderEle = useRef();
    const overlayEle = useRef();
    useEffect(() => {
        function handleResize() {
            dispatch(screenWidth(window.innerWidth));
        }
        dispatch(screenWidth(window.innerWidth));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    function handleSearchOverlay(e) {
        if (overlayEle.current.style.display === "block") {
            if (
                e.target.id === "background-overlay" ||
                e.target.id === "close-background-overlay-button" ||
                e.key === "Enter"
            ) {
                searchHeaderEle.current.classList.add("slideUpAni");
                setTimeout(() => {
                    overlayEle.current.style.display = "none";
                    searchHeaderEle.current.classList.remove("slideUpAni");
                }, 400);
            }
        } else {
            overlayEle.current.style.display = "block";
        }
    }

    // function goToMens() {
    //     if (!window.location.pathname.includes("pages")) {
    //         history.push("/pages/men/sneakers");
    //     } else {
    //         history.push("/pages/men/sneakers");
    //         window.location.reload();
    //     }
    // }
    function goToWomens() {
        if (!window.location.pathname.includes("pages")) {
            history.push("/pages/women/sneakers");
        } else {
            history.push("/pages/women/sneakers");
            window.location.reload();
        }
    }
    function goToKids() {
        if (!window.location.pathname.includes("pages")) {
            history.push("/pages/kids/sneakers");
        } else {
            history.push("/pages/kids/sneakers");
            window.location.reload();
        }
    }

    function handleSearch(e) {
        if (e.key === "Enter") {
            handleSearchOverlay(e);
            const v = e.target.value;
            e.target.value = "";
            if (!window.location.pathname.includes("search")) {
                history.push(`/pages/search/?search=${v}`);
            } else {
                history.push(`/pages/search/?search=${v}`);
                window.location.reload();
            }
        }
    }
    useEffect(() => {
        function checkAccount() {
            fetch("/api/account").then((res) => {
                if (res.ok) {
                    dispatch(LoggedIn());
                }
            });
        }
        checkAccount();
        updateCartInfo(dispatch);
    }, [dispatch]);

    return (
        <>
            <header id="nav-header">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h1>Loop</h1>
                </Link>

                <div id="nav-pages-container">
                    <Link to="/pages/men/sneakers">
                        <button
                            className="nav-buttons nav-buttons-underline"
                            style={{ fontWeight: "bold" }}
                        >
                            Men
                        </button>
                    </Link>
                    <Link to="/pages/women/sneakers">
                        <button
                            className="nav-buttons nav-buttons-underline"
                            style={{ fontWeight: "bold" }}
                        >
                            Women
                        </button>
                    </Link>
                    <Link to="/pages/kids/sneakers">
                        <button
                            className="nav-buttons nav-buttons-underline"
                            style={{ fontWeight: "bold" }}
                        >
                            Kids
                        </button>
                    </Link>
                </div>

                {width > 600 ? (
                    <div id="nav-left-container">
                        <button
                            className="nav-buttons nav-buttons-underline"
                            onClick={handleSearchOverlay}
                        >
                            Search
                        </button>
                        {userLoggedIn ? (
                            <Link to="/account/info">
                                <button className="nav-buttons nav-buttons-underline">
                                    Account
                                </button>
                            </Link>
                        ) : (
                            <Link to="/account/login">
                                <button className="nav-buttons nav-buttons-underline">
                                    Account
                                </button>
                            </Link>
                        )}

                        <button
                            className="nav-buttons nav-buttons-underline"
                            onClick={() => dispatch(showCartInfo("REVERSE_CARTINFO"))}
                        >
                            Bag ({bagNum})
                        </button>
                    </div>
                ) : (
                    <div className="dropdown">
                        <button className="dropbtn">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="dropdown-content">
                            <button
                                className="nav-buttons nav-buttons-underline"
                                onClick={handleSearchOverlay}
                                style={{ color: "black" }}
                            >
                                Search
                            </button>
                            {userLoggedIn ? (
                                <Link to="/account/info">
                                    <button
                                        className="nav-buttons nav-buttons-underline"
                                        style={{ color: "black" }}
                                    >
                                        Account
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/account/login">
                                    <button
                                        className="nav-buttons nav-buttons-underline"
                                        style={{ color: "black" }}
                                    >
                                        Account
                                    </button>
                                </Link>
                            )}
                            <button
                                className="nav-buttons nav-buttons-underline"
                                onClick={() => dispatch(showCartInfo("REVERSE_CARTINFO"))}
                                style={{ color: "black" }}
                            >
                                Bag ({bagNum})
                            </button>
                        </div>
                    </div>
                )}

                <div id="background-overlay" onMouseDown={handleSearchOverlay} ref={overlayEle}>
                    <div id="search-header" ref={searchHeaderEle}>
                        <input placeholder="Search..." onKeyDown={handleSearch}></input>
                        <button
                            id="close-background-overlay-button"
                            className="nav-buttons nav-buttons-underline"
                            onClick={handleSearchOverlay}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
