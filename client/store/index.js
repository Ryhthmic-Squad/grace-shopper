import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productList from './product/productList';
import productDetail from './product/productDetail';
import productReviews from './product/productReviews';
import productInventory from './product/productInventory';
import userList from './user/userList';
import orderList from './order/orderList';
import updateUser from './user/userUpdate';
const reducer = combineReducers({
  productList,
  productDetail,
  productReviews,
  productInventory,
  userList,
  orderList,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
