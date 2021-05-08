import axios from 'axios';

export const UPDATE_OWN_USER = 'UPDATE_OWN_USER';

export const updateUser = (user) => ({
  user,
  type: UPDATE_USER,
});

export const updateOwnUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/users/', user, {
        headers: { authorization: token },
      });
      dispatch(updateUser(data));
    } catch (er) {
      console.log(er);
    }
  };
};
const initialState = {
  users: [],
};
export default (state = initialState, action) => {
  const { type } = action;
  if (type === UPDATE_OWN_USER) {
    return {
      users: state.users.map((user) =>
        user.id === action.user.id ? action.user : user
      ),
    };
  } else return state;
};
