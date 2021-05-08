import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productList from './product/productList';
import productDetail from './product/productDetail';
import productReviews from './product/productReviews';
import cart from './cart/cart';
import productInventory from './product/productInventory';
import userList from './user/userList';
import userDelete from './user/userDelete';
import orderList from './order/orderList';
import updateOwnUser from './user/updateOwnUser';
import updateUser from './user/userUpdate';
import processOrder from './orderProcessing/processOrder';
import productPagination from './product/productPagination';
import productFilters from './product/productFilters';
import productCreate from './product/productCreate';
import orderHistory from './order/orderUser';
import reviewUsers from './reviews/reviewUsers';
import productTypes from './product/productTypes';
import productStyles from './product/productStyles';
import productRooms from './product/productRooms';
import token from './auth/token';
import auth from './auth/auth';

const reducer = combineReducers({
  cart,
  productList,
  productDetail,
  productReviews,
  productInventory,
  userList,
  updateUser,
  userDelete,
  orderList,
  productCreate,
  productPagination,
  productFilters,
  processOrder,
  orderHistory,
  reviewUsers,
  updateOwnUser,
  productTypes,
  productStyles,
  productRooms,
  token,
  auth,
});

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, composedEnhancer);

export default store;
