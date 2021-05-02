const bagCountReducer = (state=0,action)=>{
    switch(action.type){
        case 'INCREMENT':
            return state+1
        case 'DECREMENT':
            return state-1
        case 'UPDATE_AMOUNT':
            return state = action.payload
        default:
            return state
    }
}

export default bagCountReducer