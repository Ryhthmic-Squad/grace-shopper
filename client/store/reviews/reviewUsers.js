import axios from 'axios';

export const SET_REVIEW_HISTORY = 'SET_REVIEW_HISTORY';

export const setReviewHistory = (reviews) => ({
  reviews,
  type: SET_REVIEW_HISTORY,
});

export const fetchUserReviews = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/Reviews/${id}`);
      dispatch(setReviewHistory(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  reviews: [],
};
export default (state = initialState, action) => {
  const { type, reviews } = action;
  if (type === SET_REVIEW_HISTORY) {
    return {
      reviews,
    };
  } else return state;
};
