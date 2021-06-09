import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/HomePage/Homepage'
import { useDispatch } from 'react-redux'
import { updateCart, bagCount } from './redux/actions/index'
import ProductsPage from './components/productsPage/productsPage'
import SpecificProductPage from './components/SpecificProductPage/specificProductPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import AccountPage from './components/AccountsPage/AccountsPage'
function App(props) {
  const dispatch = useDispatch()


  
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/pages/men/" render={()=><ProductsPage typeOfPage="men"/>}></Route>
        <Route path="/pages/women/" render={()=><ProductsPage typeOfPage="women"/>} ></Route>
        <Route path="/pages/product/:id" exact render={()=><SpecificProductPage/>} ></Route>
        <Route path="/account/login" exact component={LoginPage}></Route>
        <Route path="/account/register" exact component={RegisterPage}></Route>
        <Route path="/account/info" exact component={AccountPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
