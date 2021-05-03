import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productList from './product/productList';
import productDetail from './product/productDetail';
import productReviews from './product/productReviews';
<<<<<<< HEAD
import cartItems from './cart/cartItems';
=======
import productPagination from './product/productPagination';
import productFilters from './product/productFilters';
>>>>>>> main

const reducer = combineReducers({
  productList,
  productDetail,
  productReviews,
<<<<<<< HEAD
  cartItems,
=======
  productPagination,
  productFilters,
>>>>>>> main
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
