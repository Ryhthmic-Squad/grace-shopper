import axios from 'axios';

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => ({
  user,
  type: UPDATE_USER,
});

export const updateUserData = (user) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      const { data } = await axios.put('/api/users/adminedit', user, {
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
  if (type === UPDATE_USER) {
    return {
      users: state.users.map((user) =>
        user.id === action.user.id ? action.user : user
      ),
    };
  } else return state;
};
