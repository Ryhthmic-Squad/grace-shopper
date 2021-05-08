import axios from 'axios';

export const SET_PRODUCT_STYLES = 'SET_PRODUCT_STYLES';

export const setProductStyles = (productStyles) => ({
  productStyles,
  type: SET_PRODUCT_STYLES,
});

export const fetchProductStyles = () => {
  return async (dispatch) => {
    try {
      const { data: productStyles } = await axios.get('/api/products/styles');
      dispatch(setProductStyles(productStyles));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, productStyles } = action;
  if (type === SET_PRODUCT_STYLES) return productStyles;
  return state;
};
