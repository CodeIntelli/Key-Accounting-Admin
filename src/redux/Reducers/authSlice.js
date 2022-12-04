import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, loadUser } from "../Actions/authAction";

const user = JSON.parse(localStorage.getItem("user"));



// const initialState = user ? { isAuthenticated: true, user } : { isAuthenticated: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.loading]: (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },
        [loadUser.loading]: (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.isAuthenticated = action.payload.user;
        },
        [loadUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.errMessage = action.payload;
        },
        [login.loading]: (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;