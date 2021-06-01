import { updateCart,bagCount } from '../../redux/actions/index'

export default function updateCartInfo(dispatch) {
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