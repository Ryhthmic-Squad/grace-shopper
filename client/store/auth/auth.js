import axios from 'axios';

export const SET_AUTH = 'SET_AUTH';

export const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

export const fetchAuth = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users', {
        headers: {
          authorization: token,
        },
      });
      console.log('----->fetchAuth', data);
      dispatch(setAuth(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const RESET_AUTH = 'RESET_AUTH';

export const resetAuth = () => ({
  type: RESET_AUTH,
  auth: {},
});

const initialState = {};

export default (state = initialState, action) => {
  const { type, auth } = action;
  if (type === SET_AUTH) return auth;
  if (type === RESET_AUTH) {
    console.log('-----> Auth reducer', auth);
    return auth;
  }
  return state;
};
