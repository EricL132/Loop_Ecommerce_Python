import './Navbar.css'


export default function Navbar() {

    function handleSearchOverlay(e) {
        const current = document.getElementById("background-overlay").style.display
        if (current == "block") {
            if (e.target.id === "background-overlay" || e.target.id === "close-background-overlay-button") {
                document.getElementById("background-overlay").style.display = "none"
            }
        } else {
            document.getElementById("background-overlay").style.display = "block"

        }
    }

    return (
        <>
            <header>
                <h1>Loop</h1>
                <div id="nav-left-container">
                    <button class="nav-buttons" onClick={handleSearchOverlay}>Search</button>
                    <button class="nav-buttons">Account</button>
                    <button class="nav-buttons">Bag (0)</button>
                </div>

            </header>
            <div id="background-overlay" onMouseDown={handleSearchOverlay}>
                <div id="search-header">
                    <input placeholder="Search..."></input>
                    <button id="close-background-overlay-button" class="nav-buttons" onClick={handleSearchOverlay}>Close</button>
                </div>
            </div>

        </>
    )
}