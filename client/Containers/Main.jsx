import React, { Component } from 'react';
import UserDashboard from './UserDashboard';
import { connect } from 'react-redux';
import AllProducts from './AllProducts';
import HomePage from '../Containers/HomePage';
import SingleProduct from './SingleProduct';
import { setToken, fetchToken } from '../store/auth/token.js';
import { fetchCartProducts } from '../store/cart/cartProducts';
import { fetchAuth } from '../store/auth/auth.js';

const mapStateToProps = ({ auth, token, cartProducts }) => ({
  auth,
  token,
  cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuth: (token) => dispatch(fetchAuth(token)),
  fetchToken: (credentials) => dispatch(fetchToken(credentials)),
  setToken: (token) => dispatch(setToken(token)),
  fetchCartProducts: (token) => dispatch(fetchCartProducts(token)),
});

import MainNav from './MainNav';
import Checkout from './Checkout/Checkout';
import AllUsers from './Admin/AllUsers';
import AllOrders from './Admin/AllOrders';
import AllInventory from './Admin/AllInventory';
import EditUser from './Admin/EditUser';
import AddProduct from './Admin/AddProduct';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import YourRecentOrders from './User/YourRecentOrders';
import EditYourProfile from './User/EditYourProfile';
import OrderDetails from './User/OrderDetails';
import YourReviews from './User/YourReviews';
class Main extends Component {
  componentDidMount = () => {
    const { fetchToken, setToken, fetchCartProducts } = this.props;
    const token = window.localStorage.token;
    console.log(token);
    if (!token) {
      fetchToken({ visitor: true });
    } else {
      setToken(token);
    }
  };

  componentDidUpdate = (prevProps) => {
    const { token: prevToken } = prevProps;
    const { fetchToken, token, fetchCartProducts, fetchAuth } = this.props;
    if (token === '') {
      fetchToken({ visitor: true });
    }
    if (prevToken !== token) {
      fetchAuth(token); // don't want this to fire for visitors?
      fetchCartProducts(token);
    }
  };

  render() {
    console.log('Main', this.props);
    return (
      <>
        <Router>
          <MainNav />

          <Switch>
            <Route component={HomePage} path="/" exact />

            <Route component={UserDashboard} path="/login" exact />

            <Route component={Checkout} path="/checkout" exact />
            <Route component={AllUsers} path="/AdminConsole/users" exact />
            <Route component={AllOrders} path="/AdminConsole/orders" exact />
            <Route
              component={AllInventory}
              path="/AdminConsole/inventory"
              exact
            />
            <Route
              exact
              path="/AdminConsole/users/edit/:id"
              component={EditUser}
            />
            <Route
              component={AddProduct}
              path="/AdminConsole/addproduct"
              exact
            />
            <Route component={EditYourProfile} path="/user/profile" exact />
            <Route component={YourRecentOrders} path="/user/orders" exact />
            <Route component={OrderDetails} path="/user/orders/:id" exact />
            <Route component={YourReviews} path="/user/reviews" exact />
          </Switch>

          <Route component={HomePage} path="/" exact />

          {/* <Route component={MainNav} /> */}
          <Route component={AllProducts} path="/products" exact />

          <Route component={SingleProduct} path="/products/:id" exact />
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
