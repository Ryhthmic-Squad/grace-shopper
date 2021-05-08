import axios from 'axios';

export const SET_PRODUCT_ROOMS = 'SET_PRODUCT_ROOMS';

export const setProductRooms = (productRooms) => ({
  productRooms,
  type: SET_PRODUCT_ROOMS,
});

export const fetchProductRooms = () => {
  return async (dispatch) => {
    try {
      const { data: productRooms } = await axios.get('/api/products/rooms');
      dispatch(setProductRooms(productRooms));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, productRooms } = action;
  if (type === SET_PRODUCT_ROOMS) return productRooms;
  return state;
};
