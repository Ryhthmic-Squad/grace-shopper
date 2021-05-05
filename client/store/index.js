import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productList from './product/productList';
import productDetail from './product/productDetail';
import productReviews from './product/productReviews';
import cartProducts from './cart/cartProducts';
import productInventory from './product/productInventory';
import userList from './user/userList';
import orderList from './order/orderList';
import updateUser from './user/userUpdate';
import productPagination from './product/productPagination';
import productFilters from './product/productFilters';
import productCreate from './product/productCreate';
import orderHistory from './order/orderUser';
import reviewUsers from './reviews/reviewUsers';
const reducer = combineReducers({
  cartProducts,
  productList,
  productDetail,
  productReviews,
  productInventory,
  userList,
  updateUser,
  orderList,
  productCreate,
  productPagination,
  productFilters,
  orderHistory,
  reviewUsers,
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
