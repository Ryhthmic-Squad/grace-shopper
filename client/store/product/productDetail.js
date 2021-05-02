import axios from 'axios';

export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL';

export const setProductDetail = (productDetail) => ({
  productDetail,
  type: SET_PRODUCT_DETAIL,
});

// fetchProductDetail is a thunk that needs a product id, which it uses to fetch
// all product details for the selected product.
export const fetchProductDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data: productDetail } = await axios.get(`/api/product/${id}`);
      dispatch(setProductDetail(productDetail));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  const { type, productDetail } = action;
  if (type === SET_PRODUCT_DETAIL) return productDetail;
  else return state;
};
