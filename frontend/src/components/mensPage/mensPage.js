
import { useEffect, useState } from "react"
import "./mensPage.css"
import { useHistory } from 'react-router'

export default function SpecificPage() {
    const [productsToShow, setProductsToShow] = useState()
    const history = useHistory()
    function getProducts() {
        const currentType = window.location.pathname.split("/")
        fetch(`/api/men?type=${currentType[currentType.length - 1]}`).then((res) => res.json()).then((data) => {
            setProductsToShow(data.products)
            changeImageSize(currentType[currentType.length - 1])
        })

    }
    useEffect(() => {
        getProducts()
    }, [])
    function changeImageSize(currentType) {
        if (currentType == "sunglasses" || currentType == "socks") {
            let ele = document.getElementsByClassName("product-image")
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.height = "190px"
            }
        } else {
            let ele = document.getElementsByClassName("product-image")
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.height = "270px"
            }
        }
    }
    function changeProductsType(e) {

        history.push(`/pages/men/${e.target.getAttribute("name")}`)

        fetch(`/api/men?type=${e.target.getAttribute("name")}`).then((res) => res.json()).then((data) => {
            setProductsToShow(data.products)
            changeImageSize(e.target.getAttribute("name"))
        })

    }

    function changeSelectedSize(e) {
        let child = e.target.parentElement.children
        for (var i = 0; i < child.length; i++) {
            if (child[i].classList.contains("product-size-selected")) {
                child[i].classList.remove("product-size-selected")
                e.target.classList.add("product-size-selected")
            }
        }

    }
    return (
        <div className="main mid-container">
            <div className="list-container">
                <h1 className="section-header">Men</h1>
                <ul className="full-List">
                    <li className="semi-List-header">Footwear</li>
                    <ul className="semi-List">
                        <li className="list-section middle" name="sneakers" onClick={changeProductsType}>Sneakers</li>
                        <li className="list-section" name="sandels" onClick={changeProductsType}>Sandels</li>
                        <li className="list-section" name="boots" onClick={changeProductsType}>Boots</li>
                        <li className="list-section" name="socks" onClick={changeProductsType}>Socks</li>
                    </ul>
                </ul>
                <ul className="full-List">
                    <li className="semi-List-header">Apparel</li>
                    <ul className="semi-List">
                        <li className="list-section" name="tops" onClick={changeProductsType}>Tops</li>
                        <li className="list-section" name="bottoms" onClick={changeProductsType}>Bottoms</li>
                        <li className="list-section" name="sweaters" onClick={changeProductsType}>Sweaters</li>
                    </ul>
                </ul>
                <ul className="full-List">
                    <li className="semi-List-header">Accesories</li>
                    <ul className="semi-List">
                        <li className="list-section" name="sunglasses" onClick={changeProductsType}>Sunglasses</li>
                    </ul>
                </ul>
            </div>
            <div className="products-container">
                <div className="sort-by-container">
                    <div className="sort-right-container">
                        <label id="sort-label">Sort By:</label>
                        <select id="sort-option" name="sort-option">
                            <option>Featured</option>
                            <option>Best Sellers</option>
                            <option>Price: Low To High</option>
                            <option>Price: High To Low</option>
                        </select>
                    </div>


                </div>
                <div className="products-container-p">


                    {productsToShow ?
                        productsToShow.map((product, i) => {
                            return <div key={i} className="product-container">
                                <img className="product-image" src={product.image}></img>
                                <div className="product-info-container">
                                    <div className="product-info-add-container">
                                        <h1 className="product-name">{product.name}</h1>
                                        <button item={i} className="nav-buttons product-cart">Cart</button>
                                    </div>

                                    < div >
                                        <span className="product-price">${product.price}</span>
                                        {product.size!="0.0" ?
                                            <div className="product-size-container">
                                                {!product.size.includes(",") ?
                                                    <>

                                                        <span className="product-size product-size-selected" >{product.size}</span>
                                                        <label className="product-size-label" style={{ float: "right" }}>Size:</label>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            product.size.split(",").map((size, i) => {
                                                                if (i == product.size.split(",").length - 1) {
                                                                    return <span className="product-size  product-size-selected" style={{ float: "right", marginLeft: "2px" }} onClick={changeSelectedSize}>{size}</span>
                                                                } else {
                                                                    return <span className="product-size" style={{ float: "right", marginLeft: "2px" }} onClick={changeSelectedSize}>{size}</span>

                                                                }

                                                            })
                                                        }
                                                        < label className="product-size-label" style={{ float: "right" }}>Size:</label>
                                                    </>
                                                }
                                            </div>
                                            : null}
                                    </div>




                                </div>
                            </div>
                        })

                        : null}
                </div>
            </div>
        </div >
    )
}