import axios from 'axios';

export const DELETE_USER = 'DELETE_USER';

export const deleteUserAway = (user) => ({
  user,
  type: DELETE_USER,
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      const { data } = await axios.delete(`/api/users/${id}`, {
        headers: { authorization: token },
      });
      dispatch(deleteUserAway(data));
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
  if (type === DELETE_USER) {
    return {
      users: state.users.filter((user) => user.id != action.user.id),
    };
  } else return state;
};
