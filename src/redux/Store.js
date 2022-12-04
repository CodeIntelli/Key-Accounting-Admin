import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Reducers/authSlice";
import messageReducer from "./Reducers/messageSlice";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

export const store = configureStore({
    reducer,
    devTools: true,
});