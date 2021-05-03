export const SET_PRODUCT_FILTERS = 'SET_PRODUCT_FILTERS';

export const setProductFilters = (productFilters) => ({
  productFilters, // should be formatted like initial state below
  type: SET_PRODUCT_FILTERS,
});

export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const filterByType = (filter) => ({ type: SET_FILTER_TYPE, filter });

export const SET_FILTER_STYLE = 'SET_FILTER_STYLE';
export const filterByStyle = (filter) => ({ type: SET_FILTER_STYLE, filter });

export const SET_FILTER_ROOM = 'SET_FILTER_ROOM';
export const filterByRoom = (filter) => ({ type: SET_FILTER_ROOM, filter });

export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const clearFilters = () => ({ type: CLEAR_FILTERS });

const initialState = {
  type: '',
  style: '',
  room: '',
};

export default (state = initialState, action) => {
  const { type, productFilters, filter } = action;
  if (type === SET_PRODUCT_FILTERS) return productFilters;
  if (type === SET_FILTER_TYPE) return { ...state, type: filter };
  if (type === SET_FILTER_STYLE) return { ...state, style: filter };
  if (type === SET_FILTER_ROOM) return { ...state, room: filter };
  if (type === CLEAR_FILTERS) return initialState;
  else return state;
};
