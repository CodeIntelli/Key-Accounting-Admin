import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

// Call Reducer Here
const reducer = {};

// if the value is in cart otherwise it will be blank and we can store cartitems in localstorage
let initialState = {};
const middleware = [thunk];

const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
