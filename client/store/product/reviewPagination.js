export const SET_REVIEW_PAGINATION = 'SET_REVIEW_PAGINATION';

export const setReviewPagination = (reviewPagination) => ({
  reviewPagination, //should be formatted like initial state below
  type: SET_REVIEW_PAGINATION,
});

const initialState = {
  maxPage: 0,
  page: 1,
  size: 6,
  sort: [['rating', 'DESC']],
};

export default (state = initialState, action) => {
  const { type, reviewPagination } = action;
  if (type === SET_REVIEW_PAGINATION) return reviewPagination;
  else return state;
};
