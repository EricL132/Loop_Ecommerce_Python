import { useCallback, useEffect, useState } from "react"
import "./SearchPage.css"
import ProductsContainer from '../productsPage/productsContainer'
import RightCartInfo from "../RightCartInfo/RightCartInfo"

export default function SearchPage(){
    const [productsToShow, setProductsToShow] = useState()
    const performSearch = useCallback(()=>{
        fetch(`/api/search/${window.location.search}`).then((res)=>res.json()).then((data)=>{
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
                data.products = processProducts(data,pID,i)
                
            }
            setProductsToShow(data.products)
        })
    },[setProductsToShow])


    function processProducts(data,pID,i){
        return data.products.filter((product, slot) => {
            return product.productID !== pID || slot === i
        })
    }

    useEffect(()=>{
        performSearch()
    },[performSearch])
    return (
        <>
        <div className="main mid-container" style={{maxWidth:"1750px"}}>
            <h1 className="search_header">Search: nike</h1>
            <ProductsContainer productsToShow={productsToShow}></ProductsContainer>
        </div>
        <RightCartInfo></RightCartInfo>
        </>

    )
}