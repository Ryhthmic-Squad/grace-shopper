import axios from 'axios';

export const SET_PRODUCT_REVIEWS = 'SET_PRODUCT_REVIEWS';

export const setProductReviews = (productReviews) => ({
  productReviews,
  type: SET_PRODUCT_REVIEWS,
});

// fetchProductReviews is a thunk that needs a product id, as well as page,
// size and sort parameters. This will grab a chunk of paginated reviews from
// the backend /api/product/:id/reviews route.
export const fetchProductReviews = ({ id, page, size, sort }) => {
  return async (dispatch) => {
    try {
      const {
        data: { maxPage, reviews },
      } = await axios.get(`/api/products/${id}/reviews`);
      //still need to build out this route
      dispatch(setProductReviews({ reviews, maxPage, page, size, sort }));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  reviews: [],
  maxPage: 0,
  page: 1,
  size: 10,
  sort: 'rating-desc',
};

export default (state = initialState, action) => {
  const { type, productReviews } = action;
  if (type === SET_PRODUCT_REVIEWS) return productReviews;
  else return state;
};
