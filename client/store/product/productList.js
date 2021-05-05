import axios from 'axios';
import buildProductQuery from '../../components/utils/buildProductQuery';
import { setProductPagination } from './productPagination';

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

export const setProductList = (productList) => ({
  productList,
  type: SET_PRODUCT_LIST,
});

// fetchProductList is a thunk that grabs products from our backend paginated
// route /api/products and attaches relevant queries from productPagination and
// productFilters stored in state
export const fetchProductList = (query) => {
  return async (dispatch, getState) => {
    const { productPagination } = getState();
    try {
      console.log(query);
      const {
        data: { maxPage, products },
      } = await axios.get(`/api/products${query}`);
      dispatch(setProductList(products));
      dispatch(setProductPagination({ ...productPagination, maxPage }));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, productList } = action;
  if (type === SET_PRODUCT_LIST) return productList;
  else return state;
};
