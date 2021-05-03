import axios from 'axios';

export const SET_USER_LIST = 'SET_USER_LIST';

export const setUserList = (userList) => ({
  userList,
  type: SET_USER_LIST,
});

export const fetchUserList = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch(setUserList(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  users: [],
};
export default (state = initialState, action) => {
  const { type, userList } = action;
  if (type === SET_USER_LIST) return { users: userList };
  else return state;
};
