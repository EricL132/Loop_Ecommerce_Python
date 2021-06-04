import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import addToCart from '../utils/addToCart'
import './specificProductPage.css'
import RightCartInfo from '../RightCartInfo/RightCartInfo'
export default function SpecificProductPage() {
    const [product, setProduct] = useState()
    const [currentImage, setCurrentImage] = useState()
    const [sizeSelected, setSizeSelected] = useState()
    const dispatch = useDispatch()
    function getProduct() {
        let productID = window.location.pathname.split("/")
        fetch(`/api/product?productid=${productID[productID.length - 1]}`).then((res) => res.json()).then((data) => {
            if (data) {
                console.log(data.sort((a, b) => a.size - b.size))
                setProduct(data)
                setCurrentImage(data[0].images[0])
            }
        })
    }
    function changeCurrentImage(e) {
        setCurrentImage(e.target.src)
    }
    function nextPhoto() {
        const currentphoto = document.getElementById("product-image").src
        const index = product[0].images.indexOf(currentphoto)
        if (index === product[0].images.length - 1) {
            setCurrentImage(product[0].images[0])
        } else {
            setCurrentImage(product[0].images[index + 1])
        }
    }

    function previousPhoto() {
        const currentphoto = document.getElementById("product-image").src
        const index = product[0].images.indexOf(currentphoto)
        if (index === 0) {
            setCurrentImage(product[0].images[product.images.length - 1])
        } else {
            setCurrentImage(product[0].images[index - 1])
        }
    }
    function selectSize(e) {
        if (sizeSelected) {
            document.getElementsByClassName("size_selected")[0].classList.remove("size_selected")
        }
        setSizeSelected(e.target)
        e.target.classList.add("size_selected")

    }
    function addItem() {
        addToCart(sizeSelected, product, dispatch)
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <div className="main mid-container product-page-mid">

                {product ?
                    <>
                        <div className="left-product-container">
                            <div className="product-photos-container">
                                <button className="photo-button left-button" onClick={previousPhoto}><i className="fas fa-arrow-left"></i></button>
                                <button className="photo-button right-button" onClick={nextPhoto}><i className="fas fa-arrow-right"></i></button>
                                <img id="product-image" className="product-image" src={currentImage}></img>

                            </div>
                            {product[0].images ?
                                <div className="all-photos-container">
                                    {product[0].images.map((img) => {
                                        return <img className="smaller-product-image" onClick={changeCurrentImage} src={img}></img>
                                    })}

                                </div>
                                : null}

                        </div>

                        <div className="product-info-container-s">
                            <h5 className="product-type">{product[0].itemType.substring(0, 1).toUpperCase() + product[0].itemType.substring(1, product[0].itemType.length)}</h5>
                            <h1 className="product-name">{product[0].name}</h1>
                            {product[0].colors ?
                                <span>{product[0].colors}</span>

                                : null}
                            <h2 className="product-price">${product[0].price}</h2>
                            <span className="select-size-span">Select size</span>
                            <div className="sizes-available-container">
                                {product.map((p, i) => {
                                    return <div className="size-container">
                                        <button className="size-span" item={i} onClick={selectSize}>M {parseFloat(p.size)}/W {parseFloat(p.size) + 1}</button>
                                    </div>
                                })}

                            </div>
                            <button className="add-to-bag-button" onClick={addItem}>Add To Bag</button>
                        </div>
                    </>
                    : null}


            </div>
            <RightCartInfo></RightCartInfo>
        </>
    )
}