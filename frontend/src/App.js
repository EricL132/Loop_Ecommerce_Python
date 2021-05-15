import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './components/HomePage/Homepage'
import { useDispatch } from 'react-redux'
import { updateCart, bagCount } from './redux/actions/index'
import SpecificPage from './components/SpecificPage/SpecificPage'
function App(props) {
  const dispatch = useDispatch()


  function updateCartInfo() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (cart) {
      let bag = 0;
      for (var [key, value] of Object.entries(cart)) {
        bag += value.quantity
      }
      dispatch(bagCount(bag))
      dispatch(updateCart(cart))
    }

  }
  return (
    <BrowserRouter>
      <Navbar updateCartInfo={updateCartInfo}></Navbar>
      <Switch>
        <Route path="/" exact render={() => (<Home updateCartInfo={updateCartInfo}></Home>)}></Route>
        <Route path="/pages/men" component={SpecificPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
