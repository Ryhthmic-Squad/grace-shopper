import axios from 'axios';

export const SET_ORDER_HISTORY = 'SET_ORDER_HISTORY';

export const setOrderList = (orderList) => ({
  orderList,
  type: SET_ORDER_HISTORY,
});

export const fetchUserOrders = (id) => {
  return async (dispatch) => {
    try {
      console.log('in orderUser thunks', id);
      const { data } = await axios.get(`api/Orders/${id}`);
      console.log('the data', data);
      dispatch(setOrderList(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  orders: [],
};
export default (state = initialState, action) => {
  const { type, orderList } = action;
  if (type === SET_ORDER_HISTORY) {
    return {
      orders: orderList,
    };
  } else return state;
};
