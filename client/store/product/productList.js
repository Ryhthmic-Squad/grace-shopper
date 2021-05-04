import axios from 'axios';
import { setProductPagination } from './productPagination';

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

export const setProductList = (productList) => ({
  productList,
  type: SET_PRODUCT_LIST,
});

// fetchProductList is a thunk that grabs products from our backend paginated
// route /api/products and attaches relevant queries from productPagination and
// productFilters stored in state
export const fetchProductList = (history) => {
  return async (dispatch, getState) => {
    const { productPagination, productFilters } = getState();
    let query = [];
    for (const paramKey in productPagination) {
      if (paramKey !== 'maxPage') {
        query.push(`${paramKey}=${productPagination[paramKey]}`); //ex. page=1
      }
    }
    for (const paramKey in productFilters) {
      query.push(`${paramKey}=${productFilters[paramKey]}`);
    }
    query = query.join('&');
    console.log(query);
    history.push(`/products?${query}`);
    try {
      const {
        data: { maxPage, products },
      } = await axios.get(`/api/products?${query}`);
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
