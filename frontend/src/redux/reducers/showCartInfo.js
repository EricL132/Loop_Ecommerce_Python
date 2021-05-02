const cartInfoReducer = (state=false,action)=>{
    switch(action.type){
        case 'REVERSE_CARTINFO':
            return !state
        default:
            return state
    }
}

export default cartInfoReducer