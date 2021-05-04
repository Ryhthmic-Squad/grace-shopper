export const SET_AUTH = 'SET_AUTH';

export const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

export const fetchAuth = (credentials) => {
  return async (dispatch) => {
    try {
      let { data: token } = await axios.post('/api/auth', credentials);
      dispatch(setAuth(token));
    } catch (err) {
      console.error(err);
    }
  };
};

export default auth;

//resume on reducer
