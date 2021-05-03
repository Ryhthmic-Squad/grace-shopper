import axios from 'axios';

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => ({
  user,
  type: UPDATE_USER,
});

export const updateUserData = (user) => {
  return async (dispatch) => {
    try {
      console.log('in thunks', user);
      const data = (await axios.put(`/api/users/${user.id}`, user)).data;
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
