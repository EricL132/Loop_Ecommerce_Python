
import { useEffect, useState } from "react"
import "./productsPage.css"
import { useHistory } from 'react-router'
import RightCartInfo from '../RightCartInfo/RightCartInfo'
import addToCart from '../utils/addToCart'
import { useDispatch } from "react-redux"
export default function ProductsPage(props) {
    const [productsToShow, setProductsToShow] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    function getProducts() {
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
                if(Array.isArray(data.products[i])){
                    data.products[i].sort((a,b)=>a.size-b.size)
                }else{
                    data.products[i] = [data.products[i]]
                }
                data.products = data.products.filter((product, slot) => {
                    return product.productID !== pID || slot === i
                })
                
            }
            setProductsToShow(data.products)
            changeImageSize(currentType[currentType.length - 1])
        })

    }
    useEffect(() => {
        getProducts()
    }, [])
    function changeImageSize(currentType) {
        if (currentType === "sunglasses" || currentType === "socks") {
            let ele = document.getElementsByClassName("product-image")
            for (var i = 0; i < ele.length; i++) {
                ele[i].style.height = "190px"
            }
        } else {
            let ele = document.getElementsByClassName("product-image")
            for (var j = 0; j < ele.length; j++) {
                ele[j].style.height = "270px"
            }
        }
    }
    function changeProductsType(e) {

        history.push(`/pages/${props.typeOfPage}/${e.target.getAttribute("name")}`)

        getProducts()

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

    function addItem(e) {
        const ele = e.target.parentNode.parentNode.childNodes[1].children[1].children
        for(var i in ele){
            if(ele[i].classList){
                if(ele[i].classList.contains("product-size-selected")){
                    const size = ele[i].getAttribute("item")
                    addToCart(e, productsToShow, dispatch, size)
                }
                
            }
          
            
        }
    }


    function loadProductPage(e){
        const product = productsToShow[e.target.getAttribute("item")][0].productID
        history.push(`/pages/product/${product}`)
    }
    return (
        <>
            <div className="main mid-container products-page-mid">
                <div className="list-container">
                    {props.typeOfPage === "men" ?
                        <h1 className="section-header">Men</h1>
                        : props.typeOfPage === "women" ? <h1 className="section-header">Women</h1> : null}

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
                                    <img item={i} className="product-image" src={product[0].image} onClick={loadProductPage}></img>
                                    <div className="product-info-container">
                                        <div className="product-info-add-container">
                                            <h1 className="product-name">{product[0].name}</h1>
                                            <button item={i} className="nav-buttons product-cart" onClick={addItem}>Cart</button>
                                        </div>

                                        < div >
                                            <span className="product-price">${product[0].price}</span>
                                            {product[0].size !== "0.0" ?
                                                <div className="product-size-container">
                                                    {product.length > 1 ?
                                                        <>
                                                       
                                                       <label className="product-size-label">Size:</label>

                                                        {product.map((np,i)=>{
                                                            if(i===0) return <span key={i} className="product-size product-size-selected" item={np.id} style={{marginLeft:"3px"}} onClick={changeSelectedSize}>{np.size}</span>
                                                            return <span key={i} className="product-size" style={{marginLeft:"3px"}} item={np.id} onClick={changeSelectedSize}>{np.size}</span>
                                                           
                                                        })}
                                                        </>

                                                        :
                                                        <>
                                                         <label className="product-size-label" >Size:</label>

                                                        <span className="product-size product-size-selected" item={product[0].id}>{product[0].size}</span>
                                                            </>}
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
            <RightCartInfo></RightCartInfo>
        </>
    )
}