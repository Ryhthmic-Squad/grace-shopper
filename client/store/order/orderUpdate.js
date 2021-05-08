import axios from 'axios';

export const UPDATE_ORDER = 'UPDATE_ORDER';

export const setOrder = (order) => ({
  ordera,
  type: UPDATE_ORDER,
});

export const updateOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('api/Orders', order);
      dispatch(setOrder(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  orders: [],
};
export default (state = initialState, action) => {
  const { type, ordera } = action;
  if (type === UPDATE_ORDER) {
    return {
      orders: state.orders.map((order) =>
        order.id === ordera.id ? ordera : order
      ),
    };
  } else return state;
};
