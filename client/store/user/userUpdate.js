import axios from 'axios';

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => ({
  user,
  type: UPDATE_USER,
});

export const updateUserData = (user) => {
  return async (dispatch) => {
    try {
      const data = (await axios.put(`/api/users/${user.id}`, student)).data;
      dispatch(updateStudent(data));
    } catch (er) {
      console.log(er);
    }
  };
};
const initialState = {
  user: [],
};
export default (state = initialState, action) => {
  const { type, user } = action;
  if (type === UPDATE_USER) return { user: user };
  else return state;
};
