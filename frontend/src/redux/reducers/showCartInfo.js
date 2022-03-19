const cartInfoReducer = (state=false,action)=>{
    switch(action.type){
        case 'REVERSE_CARTINFO':
            return !state
        case 'DONT_SHOW_CART':
            return state = false
        default:
            return state
    }
}

export default cartInfoReducer