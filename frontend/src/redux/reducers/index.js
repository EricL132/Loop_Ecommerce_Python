import loggedReducer from './isLogged'
import bagCountReducer from './bagCount'
import cartReducer from './cart'
import cartInfoReducer from './showCartInfo'
import screenWidth from './screenWidth'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    bagCountReducer,loggedReducer,cartReducer,cartInfoReducer,screenWidth
})

export default allReducers