import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import {showCartInfo} from '../../redux/actions/index'
import { useEffect } from 'react'

export default function Navbar(props) {
    const cartInfo = useSelector(state => state.cartReducer)
    const bagNum = useSelector(state => state.bagCountReducer)
    const dispatch = useDispatch()
    function handleSearchOverlay(e) {
        const current = document.getElementById("background-overlay").style.display
        if (current === "block") {
            if (e.target.id === "background-overlay" || e.target.id === "close-background-overlay-button") {
                document.getElementById("background-overlay").style.display = "none"
            }
        } else {
            document.getElementById("background-overlay").style.display = "block"

        }
    }



    useEffect(() => {
        props.updateCartInfo()
    }, [])
    return (
        <>
            <header id="nav-header">
                <h1>Loop</h1>
                <div id="nav-left-container">
                    <button className="nav-buttons" onClick={handleSearchOverlay}>Search</button>
                    <button className="nav-buttons">Account</button>
                    <button className="nav-buttons" onClick={()=>dispatch(showCartInfo())}>Bag ({bagNum})</button>
                </div>
                <div className="background-overlay" onMouseDown={handleSearchOverlay}>
                    <div id="search-header">
                        <input placeholder="Search..."></input>
                        <button id="close-background-overlay-button" className="nav-buttons" onClick={handleSearchOverlay}>Close</button>
                    </div>
                </div>
            </header>


        </>
    )
}



