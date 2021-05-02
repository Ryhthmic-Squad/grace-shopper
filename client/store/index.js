import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productList from './product/productList';
import productDetail from './product/productDetail';
import productReviews from './product/productReviews';
import cartItems from './cart/cartItems';

const reducer = combineReducers({
  productList,
  productDetail,
  productReviews,
  cartItems,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
