import axios from 'axios';
import { fetchCartProducts } from '../cart/cartProducts';

export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const resetToken = (token) => ({
  type: RESET_TOKEN,
  token: '',
});

export const fetchToken = (credentials) => {
  return async (dispatch) => {
    try {
      // POST /api/users is reserved for creating a new user upon sign-up
      // POST /api/auth is reserved for accessing tokens
      let { data } = await axios.post('/api/auth', credentials);
      const { token } = data;
      console.log('-----> fetchToken, token', token);
      window.localStorage.setItem('token', token);
      dispatch(setToken(token));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = '';

export default (state = initialState, action) => {
  const { type, token } = action;
  if (type === SET_TOKEN) {
    return token;
  }
  if (type === RESET_TOKEN) {
    return token;
  }
  return state;
};

//resume on reducer
