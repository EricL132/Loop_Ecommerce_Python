import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { showCartInfo } from '../../redux/actions/index'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

export default function Navbar(props) {
    const cartInfo = useSelector(state => state.cartReducer)
    const bagNum = useSelector(state => state.bagCountReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    function handleSearchOverlay(e) {
        const current = document.getElementById("background-overlay").style.display

        if (current === "block") {

            if (e.target.id === "background-overlay" || e.target.id === "close-background-overlay-button") {
                    document.getElementById("search-header").classList.add("slideUpAni")
                    setTimeout(()=>{
                        document.getElementById("background-overlay").style.display = "none"
                        document.getElementById("search-header").classList.remove("slideUpAni")
                    },400)
                    
    
                
            }
        } else {
            document.getElementById("background-overlay").style.display = "block"
        }



    }

    function goToPage(){
        history.push("/pages/men/sneakers")
    }
    function goToHome(){
        history.push("/")
    }

    useEffect(() => {
        props.updateCartInfo()
    }, [])
    return (
        <>
            <header id="nav-header">
                <h1 onClick={goToHome}>Loop</h1>
                <div id="nav-pages-container">
                    <button className="nav-buttons" style={{fontWeight:"bold"}} onClick={goToPage}>Men</button>
                    <button className="nav-buttons" style={{fontWeight:"bold"}}>Women</button>
                    <button className="nav-buttons" style={{fontWeight:"bold"}}>Kids</button>
                    <button className="nav-buttons" style={{fontWeight:"bold"}}>Other</button>
                </div>
                <div id="nav-left-container">
                    <button className="nav-buttons" onClick={handleSearchOverlay}>Search</button>
                    <button className="nav-buttons">Account</button>
                    <button className="nav-buttons" onClick={() => dispatch(showCartInfo())}>Bag ({bagNum})</button>
                </div>
                <div id="background-overlay" onMouseDown={handleSearchOverlay}>
                    <div id="search-header">
                        <input placeholder="Search..."></input>
                        <button id="close-background-overlay-button" className="nav-buttons" onClick={handleSearchOverlay}>Close</button>
                    </div>
                </div>
            </header>


        </>
    )
}



