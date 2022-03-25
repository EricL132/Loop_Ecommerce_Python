import "./App.css";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Homepage";
import ProductsPage from "./components/productsPage/productsPage";
import SpecificProductPage from "./components/SpecificProductPage/specificProductPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AccountPage from "./components/AccountsPage/AccountsPage";
import SearchPage from "./components/SearchPage/SearchPage";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import ForgotPassword from "./components/FogotPassword/ForgotPassword";
import ResetPage from "./components/ResetPage/ResetPage";
import BottomMessage from "./components/BottomMessage/BottomMessage";
import RightCartInfo from "./components/RightCartInfo/RightCartInfo";
import NotFound from "./components/NotFound/NotFound";
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/pages/men/" render={() => <ProductsPage typeOfPage="men" />}></Route>
                <Route
                    path="/pages/women/"
                    render={() => <ProductsPage typeOfPage="women" />}
                ></Route>
                <Route
                    path="/pages/kids/"
                    render={() => <ProductsPage typeOfPage="kids" />}
                ></Route>

                <Route
                    path="/pages/product/:id"
                    exact
                    render={() => <SpecificProductPage />}
                ></Route>
                <Route path="/account/login" exact component={LoginPage}></Route>
                <Route path="/account/register" exact component={RegisterPage}></Route>
                <Route path="/account/forgot" exact component={ForgotPassword}></Route>
                <Route path="/account/info" exact component={AccountPage}></Route>
                <Route path="/pages/search" exact component={SearchPage}></Route>
                <Route path="/pages/checkout" exact component={CheckOutPage}></Route>
                <Route path="/order/:id" exact component={OrderSummary}></Route>
                <Route path="/account/reset/:token" exact component={ResetPage}></Route>
                <Route path="/" exact component={Home}></Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
            <BottomMessage></BottomMessage>
            {location.pathname!="/pages/checkout" && <RightCartInfo></RightCartInfo>}
        </Router>
    );
}

export default App;
