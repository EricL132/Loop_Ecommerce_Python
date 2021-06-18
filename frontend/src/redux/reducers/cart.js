const cartReducer = (state=[],action)=>{
    switch(action.type){
        case 'UPDATE_CART':
            return {cart: action.payload}
        default:
            return state
    }
}

export default cartReducer