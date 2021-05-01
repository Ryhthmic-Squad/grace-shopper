import axios from 'axios';
// import store from '../index';

const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

export const setProductList = (productList) => {
  return {
    productList,
    type: SET_PRODUCT_LIST,
  };
};

export const fetchProductList = () => {
  return async (dispatch, getState) => {
    const { productList } = getState();
    const { page, size, sort, type, style, room } = productList;
    const optionalParameters = [type, style, room].filter(
      (param) => param !== null
    );
    let query = `/api/products?page=${page}&size=${size}&sort=${sort}`;
    if (optionalParameters.length) {
      query = [query, optionalParameters.join('&')].join('&');
    }
    try {
      const {
        data: { maxPage, products },
      } = await axios.get(query);
      console.log(maxPage, products);
      dispatch(setProductList({ ...productList, maxPage, products }));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  products: [],
  maxPage: 0,
  page: 1,
  size: 6,
  sort: 'name',
  type: null,
  style: null,
  room: null,
};

export default (state = initialState, action) => {
  const { type, productList } = action;
  if (type === SET_PRODUCT_LIST) return productList;
  else return state;
};
