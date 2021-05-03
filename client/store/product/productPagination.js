export const SET_PRODUCT_PAGINATION = 'SET_PRODUCT_PAGINATION';

export const setProductPagination = (productPagination) => ({
  productPagination, //should be formatted like initial state below
  type: SET_PRODUCT_PAGINATION,
});

export const SET_PAGE_NEXT = 'SET_PAGE_NEXT';
export const nextPage = () => ({ type: SET_PAGE_NEXT });

export const SET_PAGE_PREV = 'SET_PAGE_PREV';
export const prevPage = () => ({ type: SET_PAGE_PREV });

export const SET_PAGE_SPECIFIC = 'SET_PAGE_SPECIFIC';
export const goToPage = (page) => ({ type: SET_PAGE_SPECIFIC, page });

export const SET_SIZE = 'SET_SIZE';
export const sizePage = (size) => ({ type: SET_SIZE, size });

export const SET_SORT = 'SET_SORT';
export const sortPage = (sort) => ({ type: SET_SORT, sort });

export const RESET_PAGINATION = 'RESET_PAGINATION';
export const resetPagination = () => ({ type: RESET_PAGINATION });

const initialState = {
  maxPage: 0,
  page: 1,
  size: 6,
  sort: 'name,ASC',
};

export default (state = initialState, action) => {
  const { type, productPagination, page, size, sort } = action;
  if (type === SET_PRODUCT_PAGINATION) return productPagination;
  if (type === SET_PAGE_NEXT) return { ...state, page: state.page + 1 };
  if (type === SET_PAGE_PREV) return { ...state, page: state.page - 1 };
  if (type === SET_PAGE_SPECIFIC) return { ...state, page };
  if (type === SET_SIZE) return { ...state, size };
  if (type === SET_SORT) return { ...state, sort };
  if (type === RESET_PAGINATION) return initialState;
  else return state;
};
