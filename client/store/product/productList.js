import axios from 'axios';
// import store from '../index';

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

export const setProductList = (productList) => ({
  productList,
  type: SET_PRODUCT_LIST,
});

// fetchProductList is a thunk that needs a product id, as well as page, size
// and sort parameters. You can optionally provide type, style and room filters
// to get a targeted list of products. This will grab a chunk of paginated
// products from the backend /api/products route.
export const fetchProductList = ({ page, size, sort, type, style, room }) => {
  return async (dispatch) => {
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
      dispatch(
        setProductList({
          products,
          maxPage,
          page,
          size,
          sort,
          type,
          style,
          room,
        })
      );
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
