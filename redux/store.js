import { configureStore, combineReducers, applyMiddleware } from 'redux';
import * as lagacyStore from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allUserReducer, userReducer } from './Reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  allUser: allUserReducer,
});

// if the value is in cart otherwise it will be blank and we can store cartitems in localstorage
const initialState = {};

const middleware = [thunk];

const store = lagacyStore.legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
