import axios from 'axios';

export const SET_PRODUCT_TYPES = 'SET_PRODUCT_TYPES';

export const setProductTypes = (productTypes) => ({
  productTypes,
  type: SET_PRODUCT_TYPES,
});

export const fetchProductTypes = () => {
  return async (dispatch) => {
    try {
      const { data: productTypes } = await axios.get('/api/products/types');
      dispatch(setProductTypes(productTypes));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, productTypes } = action;
  if (type === SET_PRODUCT_TYPES) return productTypes;
  return state;
};
