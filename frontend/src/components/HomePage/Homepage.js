import { useCallback, useEffect, useState } from "react";
import RightCartInfo from "../RightCartInfo/RightCartInfo";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Homepage.css";

export default function HomePage(props) {
    const [products, setProducts] = useState();
    const [currentShowing, setCurrentShowing] = useState();
    const history = useHistory();
    function getFeature() {
        fetch("/api/feature")
            .then((res) => res.json())
            .then((data) => {
                setCurrentShowing(0);
                setProducts(data);
            });
    }

    const nextPhoto = useCallback(() => {
        if (products) {
            let photo;
            if (currentShowing === products.length - 1) {
                photo = 0;
                setCurrentShowing(0);
            } else {
                photo = currentShowing + 1;
                setCurrentShowing(photo);
            }
            let con = document.getElementById("bottom-container-images");
            document
                .getElementsByClassName("selected_different_feature_button")[0]
                .classList.remove("selected_different_feature_button");
            con.childNodes[photo].classList.add("selected_different_feature_button");
        }
    }, [currentShowing, products]);

    function changeCurrent(e) {
        setCurrentShowing(parseInt(e.target.getAttribute("item")));
        document
            .getElementsByClassName("selected_different_feature_button")[0]
            .classList.remove("selected_different_feature_button");
        e.target.classList.add("selected_different_feature_button");
    }
    function goToItem() {
        history.push(`/pages/product/${products[currentShowing].pid}`);
    }
    useEffect(() => {
        getFeature();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextPhoto();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [products, currentShowing, nextPhoto]);

    return (
        <div id="home-container">
            {products && currentShowing !== undefined && (
                <img
                    id="featured-item"
                    alt="featured item"
                    src={products[currentShowing].image}
                    onClick={goToItem}
                ></img>
            )}

            <div className="home-mid-container">
                <span className="coupon-span">Use code JGFNB3 for 20% off</span>
                <div className="home_nav_container">
                    <Link to="/pages/men/sneakers">
                        <button className="home-button mens-button fill-b">Mens</button>
                    </Link>
                    <Link to="/pages/women/sneakers">
                        <button className="home-button womens-button fill-b">Womens</button>
                    </Link>
                    <Link to="/pages/kids/sneakers">
                        <button className="home-button kids-button fill-b">Kids</button>
                    </Link>
                </div>
            </div>
            {products ? (
                <div id="bottom-container-images">
                    {products.map((product, i) => {
                        if (i === 0) {
                            return (
                                <button
                                    key={i}
                                    item={i}
                                    className="different_feature_button selected_different_feature_button"
                                    onClick={changeCurrent}
                                ></button>
                            );
                        }
                        return (
                            <button
                                key={i}
                                item={i}
                                className="different_feature_button"
                                onClick={changeCurrent}
                            ></button>
                        );
                    })}
                </div>
            ) : null}

            <RightCartInfo updateCartInfo={props.updateCartInfo}></RightCartInfo>
        </div>
    );
}
