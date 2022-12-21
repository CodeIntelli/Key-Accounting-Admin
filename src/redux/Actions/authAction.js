import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../Reducers/messageSlice';

const API_URL = 'https://ecom.tutorialstaging.tech/api/v1/';

export const register = createAsyncThunk('auth/register', async ({ username, email, password }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}signup`, {
      username,
      email,
      password,
    });
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  console.log('This Login API Called', email, password);
  try {
    const result = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    if (result.data.user.email) {
      console.log('🚀 ~ file: authAction.js:22 ~ .then ~ response.data', result.data);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('x-access-token', result.data.token);
    }
    console.log('Successfully Login', result.data);
    return { user: result.data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const loadUser = createAsyncThunk('auth/loaduser', async (thunkAPI) => {
  try {
    const cookieData = localStorage.getItem('x-access-token');
    console.log('🚀 ~ file: authAction.js:64 ~ loadUser ~ cookieData', cookieData);
    const result = await axios.get(`${API_URL}profile`, {
      headers: {
        authorization: `Bearer ${cookieData}`,
      },
    });
    console.log('🚀 ~ file: authAction.js:70 ~ loadUser ~ result', result);
    return { user: result.data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  // await AuthService.logout();
  localStorage.removeItem('user');
  localStorage.removeItem('x-access-token');
  return axios.post(`${API_URL}logout`).then((response) => {
    return response.data;
  });
});
