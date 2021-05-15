import { useEffect, useState } from "react"
import "./SpecificPage.css"

export default function SpecificPage() {
    const [productsToShow, setProductsToShow] = useState()
    function getProducts() {
        console.log(productsToShow)
        if (!productsToShow) {
            console.log("vcxvcx")
            fetch("/api/mens/sneakers").then((res) => res.json()).then((data) => {
                setProductsToShow(data.products)
            })
        }
    }
    useEffect(() => {
        getProducts()
    })
    return (
        <div className="main mid-container">
            <div className="list-container">
                <h1 className="section-header">Men</h1>
                <ul className="full-List">
                    <li className="semi-List-header">Footwear</li>
                    <ul className="semi-List">
                        <li className="list-section middle">Sneakers</li>
                        <li className="list-section">Sandels</li>
                        <li className="list-section">Boots</li>
                        <li className="list-section">Socks</li>
                    </ul>
                </ul>
                <ul className="full-List">
                    <li className="semi-List-header">Apparel</li>
                    <ul className="semi-List">
                        <li className="list-section">Tops</li>
                        <li className="list-section">Bottoms</li>
                        <li className="list-section">Sweaters</li>
                    </ul>
                </ul>
                <ul className="full-List">
                    <li className="semi-List-header">Accesories</li>
                    <ul className="semi-List">
                        <li className="list-section">Sunglasses</li>
                    </ul>
                </ul>
            </div>
            <div className="products-container">
                {productsToShow ?
                    productsToShow.map((product, i) => {
                        return <div key={i} className="product-container">
                            <img className="product-image" src={product.image}></img>
                            <div className="product-info-container">
                                <div className="product-info-add-container">
                                    <h1 className="product-name">{product.name}</h1>
                                    <button item={i} className="nav-buttons product-cart" >Cart</button>
                                </div>

                                <span className="product-price">${product.price}</span>

                            </div>
                        </div>
                    })

                    : null}
            </div>
        </div>
    )
}