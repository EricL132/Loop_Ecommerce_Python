import addToCart from '../utils/addToCart'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router'
import { useEffect } from 'react'
export default function ProductsContainer(props) {
    const dispatch = useDispatch()
    const history = useHistory()
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
                    addToCart(e, props.productsToShow, dispatch, size)
                }
                
            }
          
            
        }
    }


    function loadProductPage(e){
        const product = props.productsToShow[e.target.getAttribute("item")][0].productID
        history.push(`/pages/product/${product}`)
    }


    return <div className="products-container-p">
        {props.productsToShow ?
            props.productsToShow.map((product, i) => {
                return <div key={i} className="product-container">
                    {product[0].image.includes("nike") ?
                        <img item={i} className="product_image_nike" src={product[0].image} onClick={loadProductPage}></img>
                        : <img item={i} className="product_image" src={product[0].image} onClick={loadProductPage}></img>
                    }

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

                                            {product.map((np, i) => {
                                                if (i === 0) return <span key={i} className="product-size product-size-selected" item={np.id} style={{ marginLeft: "3px" }} onClick={changeSelectedSize}>{np.size}</span>
                                                return <span key={i} className="product-size" style={{ marginLeft: "3px" }} item={np.id} onClick={changeSelectedSize}>{np.size}</span>

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
}