import axios from 'axios';

export const SET_ORDER_LIST = 'SET_ORDER_LIST';

export const setOrderList = (orderList) => ({
  orderList,
  type: SET_ORDER_LIST,
});

export const fetchOrderList = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('api/Orders');
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
  if (type === SET_ORDER_LIST) {
    return {
      orders: orderList,
    };
  } else return state;
};
