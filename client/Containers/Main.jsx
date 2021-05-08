import React, { Component } from 'react';
import { connect } from 'react-redux';

import Checkout from './Checkout/Checkout.jsx';
import AllUsers from './Admin/AllUsers.jsx';
import AllOrders from './Admin/AllOrders.jsx';
import AllInventory from './Admin/AllInventory.jsx';
import EditUser from './Admin/EditUser.jsx';
import AddProduct from './Admin/AddProduct.jsx';

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AllProducts from './AllProducts';
import MainNav from './MainNav.jsx';
import SingleProduct from './SingleProduct.jsx';
import HomePage from '../Containers/HomePage.jsx';
import UserDashboard from './UserDashboard.jsx';
import Cart from './Cart/Cart.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import GuestCheckout from './GuestCheckout.jsx';

import { setToken, fetchToken } from '../store/auth/token.js';
import { fetchCartProducts } from '../store/cart/cart';
import { fetchAuth } from '../store/auth/auth.js';

const mapStateToProps = ({ auth, token, cart }) => ({
  auth,
  token,
  cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuth: (token) => dispatch(fetchAuth(token)),
  fetchToken: (credentials) => dispatch(fetchToken(credentials)),
  setToken: (token) => dispatch(setToken(token)),
  fetchCartProducts: (token) => dispatch(fetchCartProducts(token)),
});

import YourRecentOrders from './User/YourRecentOrders.jsx';
import EditYourProfile from './User/EditYourProfile.jsx';
import OrderDetails from './User/OrderDetails.jsx';
import YourReviews from './User/YourReviews.jsx';
class Main extends Component {
  componentDidMount = () => {
    const { fetchToken, setToken } = this.props;
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
      fetchAuth(token);
      fetchCartProducts(token);
    }
  };

  render() {
    // console.log('Main', this.props);
    const { auth } = this.props;
    return (
      <>
        <Router>
          <MainNav />

          <Route
            component={AllInventory}
            path="/AdminConsole/inventory"
            exact
          />

          <Route component={AddProduct} path="/AdminConsole/addproduct" exact />

          <Route component={SingleProduct} path="/products/:id" exact />
          <Switch>
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

            <Route component={HomePage} path="/" exact />
            <Route component={AllProducts} path="/products" exact />
            <Route component={SingleProduct} path="/products/:id" exact />
            <Route path="/dashboard" exact>
              {auth.email ? <UserDashboard /> : <Redirect to="/signup" />}
            </Route>
            <Route path="/signup" exact>
              {!auth.email ? <SignUp /> : <Redirect to="/dashboard" />}
            </Route>
            <Route path="/login" exact>
              {!auth.email ? <Login /> : <Redirect to="/dashboard" />}
            </Route>
            <Route component={Cart} path="/cart" exact />
            <Route path="/cart/guestcheckout" exact>
              {!auth.email ? <GuestCheckout /> : <Redirect to="/cart" />}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
