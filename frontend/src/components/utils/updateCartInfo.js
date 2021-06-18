import { updateCart, bagCount } from '../../redux/actions/index'

export default function updateCartInfo(dispatch) {
  const cart = JSON.parse(localStorage.getItem("cart"))
      if (cart) {
        let bag = 0;
        for (var i of Object.keys(cart)) {
          bag += cart[i].quantity
        }
        dispatch(bagCount(bag))
        
        dispatch(updateCart(cart))
      } 

}