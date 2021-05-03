import axios from 'axios';
import { setReviewPagination } from './reviewPagination';

export const SET_PRODUCT_REVIEWS = 'SET_PRODUCT_REVIEWS';

export const setProductReviews = (productReviews) => ({
  productReviews,
  type: SET_PRODUCT_REVIEWS,
});

// fetchProductReviews is a thunk that needs a product id to grab the reviews
// for a given product. It first gets the page, size and sort parameters from
// the reviewPagination object in our store, then uses them for GET request to
// /api/products/:id/reviews?page&size&sort
export const fetchProductReviews = (id) => {
  return async (dispatch, getState) => {
    try {
      const {
        reviewPagination: { page, size, sort },
      } = getState();
      const query = `?page=${page}&size=${size}&sort=${sort}`;
      const {
        data: { maxPage, productReviews },
      } = await axios.get(`/api/products/${id}/reviews${query}`);
      //still need to build out this route
      dispatch(setProductReviews(productReviews));
      dispatch(setReviewPagination({ maxPage, page, size, sort }));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, productReviews } = action;
  if (type === SET_PRODUCT_REVIEWS) return productReviews;
  else return state;
};
