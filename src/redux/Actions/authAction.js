import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../Reducers/messageSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL;
console.log('🤩 ~ file: authAction.js:6 ~ API_URL', API_URL);

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
  debugger; // eslint-disable-line no-debugger
  console.log('🤩 ~ file: authAction.js:26 ~ login ~ email, password', email, password);
  try {
    const { data } = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    const result = data.result;
    console.log('🚀 ~ file: authAction.js:22 ~ .then ~ response.data', result);
    if (result) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('x-access-token', result.token);
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
    const result = await axios.get(`${API_URL}user/me`, {
      headers: {
        authorization: `Bearer ${cookieData}`,
      },
    });
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
