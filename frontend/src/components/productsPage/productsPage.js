
import { useCallback, useEffect, useState } from "react"
import "./productsPage.css"
import { useHistory } from 'react-router'
import ProductsContainer from './productsContainer'
export default function ProductsPage(props) {
    const [productsToShow, setProductsToShow] = useState()
    const [originalProducts, setOriginalProducts] = useState()
    const history = useHistory()
    const getProducts = useCallback(() => {
        const currentType = window.location.pathname.split("/")
        fetch(`/api/${props.typeOfPage}?type=${currentType[currentType.length - 1]}`).then((res) => res.json()).then((data) => {
            for (var i = 0; i < data.products.length; i++) {
                const pID = data.products[i].productID
                for (var j = 0; j < data.products.length; j++) {
                    if (i !== j && pID === data.products[j].productID) {
                        if (Array.isArray(data.products[i])) {
                            data.products[i].push(data.products[j])
                        } else {
                            data.products[i] = [data.products[i], data.products[j]]
                        }
                    }
                }
                if (Array.isArray(data.products[i])) {
                    data.products[i].sort((a, b) => a.size - b.size)
                } else {
                    data.products[i] = [data.products[i]]
                }
                data.products = filterProducts(data, pID, i)

            }
            setProductsToShow(data.products)
            setOriginalProducts(data.products)
            changeImageSize(currentType[currentType.length - 1])
        })

    }, [setProductsToShow, setOriginalProducts, props.typeOfPage])
    useEffect(() => {
        getProducts()
    }, [getProducts])

    function filterProducts(data, pID, i) {
        return data.products.filter((product, slot) => {
            return slot === i || product.productID !== pID
        })
    }

    function changeImageSize(currentType) {
        if (currentType === "sunglasses" || currentType === "socks") {
            let ele = document.getElementsByClassName("product_image")
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.height = "190px"
            }
        } else {
            let ele = document.getElementsByClassName("product_image")
            for (var j = 0; j < ele.length; j++) {
                ele[j].style.height = "270px"
            }
        }
    }
    function changeProductsType(e) {
        setProductsToShow()
        history.push(`/pages/${props.typeOfPage}/${e.target.getAttribute("name")}`)

        getProducts()

    }



    function selectSortChange(e) {
        const v = e.target.value
        switch (v) {
            case "0":
                sortFeatured()
                break;
            case "1":
                sortLowToHigh()
                break;
            case "2":
                sortHighToLow()
                break;
            default:
                break;
        }
    }

    function sortFeatured() {
        setProductsToShow(originalProducts)
    }

    function sortLowToHigh() {
        const a = [...productsToShow].sort((a, b) => {
            return a[0].price - b[0].price
        })
        setProductsToShow(a)
    }

    function sortHighToLow() {
        const a = [...productsToShow].sort((a, b) => {
            return b[0].price - a[0].price
        })
        setProductsToShow(a)
    }

    return (
        <>
            <div className="main mid-container products-page-mid">
                <div className="list-container">
                    {props.typeOfPage === "men" ?
                        <h1 className="section-header">Men</h1>
                        : props.typeOfPage === "women" ? <h1 className="section-header">Women</h1> 
                        : props.typeOfPage === "kids" ? <h1 className="section-header">Kids</h1>:null}

                    <ul className="full-List">
                        <li className="semi-List-header">Footwear</li>
                        <ul className="semi-List">
                            <li className="list-section middle" name="sneakers" onClick={changeProductsType}>Sneakers</li>
                            <li className="list-section" name="sandels" onClick={changeProductsType}>Sandels</li>
                            <li className="list-section" name="boots" onClick={changeProductsType}>Boots</li>
                            <li className="list-section" name="socks" onClick={changeProductsType}>Socks</li>
                        </ul>
                    </ul>
                    {props.typeOfPage !== "kids" ?
                        <>
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
                        </>
                        : null}

                </div>
                <div className="products-container">
                    <div className="sort-by-container">
                        <div className="sort-container">
                            <label id="sort-label">Sort By:</label>
                            <select id="sort-option" name="sort-option" onChange={selectSortChange}>
                                <option value="0">Featured</option>
                                <option value="1">Price: Low To High</option>
                                <option value="2">Price: High To Low</option>
                            </select>
                        </div>


                    </div>



                    <ProductsContainer productsToShow={productsToShow}></ProductsContainer>


                </div>
            </div >
        </>
    )
}