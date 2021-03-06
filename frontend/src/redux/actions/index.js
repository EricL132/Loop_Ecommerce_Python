export const bagCount=(info)=>{
    return{
        type:'UPDATE_AMOUNT',
        payload: info
    }
}

export const IncrementBagCount = ()=>{
    return{
        type:'INCREMENT'
    }
}

export const DecrementBagCount = ()=>{
    return{
        type:'DECREMENT'
    }
}

export const showCartInfo = (call)=>{
    return {
        type: call
    }
}

export const updateCart=(info)=>{
    return {
        type:'UPDATE_CART',
        payload: info
    }
}

export const LoggedIn=()=>{
    return {
        type:'SIGN_IN'
    }
}

export const screenWidth=(info)=>{
    return {
        type: 'CHANGE_WIDTH',
        payload:info
    }
}