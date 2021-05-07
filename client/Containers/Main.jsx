import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    console.log('Main', this.props);
    const { auth } = this.props;
    return (
      <>
        <Router>
          <MainNav />
          <Switch>
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
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
