import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer  , productDetailsReducer} from './reducers/productReducers';
const reducer = combineReducers({
    products: productsReducer ,
    productDetails: productDetailsReducer,
})

let initialState = {}

const store = configureStore({
    reducer,
    middleware: [thunk],
    initialState, 
    devTools: composeWithDevTools(applyMiddleware(thunk))
})


export default store;