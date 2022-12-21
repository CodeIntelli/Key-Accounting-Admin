import axios from 'axios';
import Cookies from 'js-cookie';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ADMIN_ALL_USER_REQUEST,
  ADMIN_ALL_USER_SUCCESS,
  ADMIN_ALL_USER_FAIL,
  ADMIN_USER_DETAIL_REQUEST,
  ADMIN_USER_DETAIL_SUCCESS,
  ADMIN_USER_DETAIL_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  CLEAR_ERRORS,
} from '../Constants/userConstant';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`https://ecom.tutorialstaging.tech/api/v1/login`, { email, password }, config);
    console.log('🤩 ~ file: userAction.js:51 ~ login ~ data', data);
    Cookies.set('token', data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(`https://ecom.tutorialstaging.tech/api/v1/register`, userData, config);
    Cookies.set('token', data.token);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const cookieData = Cookies.get('token');
    if (!cookieData) {
      Cookies.set('token', '');
      window.location.reload();
    }
    const { data } = await axios.get(`https://ecom.tutorialstaging.tech/api/v1/profile`, {
      headers: {
        authorization: `Bearer ${cookieData}`,
      },
    });

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// logout action

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`https://ecom.tutorialstaging.tech/api/v1/Logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenData}`,
      },
    };

    const { data } = await axios.put(`https://ecom.tutorialstaging.tech/api/v1/edit_profile`, userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData}`,
      },
    };

    const { data } = await axios.put(`https://ecom.tutorialstaging.tech/api/v1/changePassword`, password, config);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `https://ecom.tutorialstaging.tech/api/v1//password/forgotpassword`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `https://ecom.tutorialstaging.tech/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_USER_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenData}`,
      },
    };
    const { data } = await axios.get(`https://ecom.tutorialstaging.tech/api/v1/details`, config);

    dispatch({ type: ADMIN_ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_DETAIL_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenData}`,
      },
    };
    const { data } = await axios.get(`https://ecom.tutorialstaging.tech/api/v1/admin/user/${id}`, config);

    console.log('🚀 ~ file: userAction.js:232 ~ getUserDetails ~ data', data);
    dispatch({ type: ADMIN_USER_DETAIL_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenData}`,
      },
    };

    const { data } = await axios.put(`https://ecom.tutorialstaging.tech/api/v1/admin/user/${id}`, userData, config);

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST });
    const tokenData = Cookies.get('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenData}`,
      },
    };

    const { data } = await axios.delete(`https://ecom.tutorialstaging.tech/api/v1/admin/user/${id}`, config);

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
