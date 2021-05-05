import axios from 'axios';

export const SET_AUTH = 'SET_AUTH';

export const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

export const fetchAuth = (credentials) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post('/api/auth', credentials);
      const { token } = data;
      window.localStorage.setItem('token', token);
      dispatch(setAuth(token));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  const { type, auth } = action;
  if (type === SET_AUTH) return auth;
  return state;
};

//resume on reducer
