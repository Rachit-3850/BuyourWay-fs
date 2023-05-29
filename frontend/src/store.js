import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer  , productDetailsReducer} from './reducers/productReducers';
import { authReducer  , userReducer , forgotPasswordReducer} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';


const reducer = combineReducers({
    products: productsReducer ,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    }
}

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: composeWithDevTools(applyMiddleware(thunk))
})


export default store;