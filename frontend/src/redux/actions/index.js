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

export const showCartInfo = ()=>{
    return {
        type:'REVERSE_CARTINFO'
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