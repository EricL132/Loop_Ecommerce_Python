import { useEffect, useState } from "react"

export default function SpecificProductPage() {
    const [product, setProduct] = useState()
    function getProduct() {
        let productID = window.location.pathname.split("/")
        fetch(`/api/product?productid=${productID[productID.length - 1]}`).then((res) => res.json()).then((data) => {
            if (data) {
                setProduct(data[0])
            }
        })
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="main">
            <div className="product-photos-container">
                
            </div>

        </div>


    )
}