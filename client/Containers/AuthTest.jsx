import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../store/auth/auth';
import { setToken, fetchToken } from '../store/auth/token';
import { fetchCartProducts } from '../store/cart/cartProducts';

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

class AuthTest extends Component {
  componentDidMount = () => {
    const { fetchToken, setToken, fetchCartProducts } = this.props;
    const token = window.localStorage.token;
    console.log(token);
    if (!token) {
      fetchToken({ visitor: true });
    } else {
      setToken(token);
      fetchCartProducts(token);
    }
  };

  componentDidUpdate = () => {
    const { token } = this.props;
    console.log(token);
  };

  render = () => {
    const { token, cartProducts, fetchToken } = this.props;
    return (
      <div>
        <h1>Auth Test</h1>
        <p>This is our token: {token}</p>
        <p>This is our cart: {JSON.stringify(cartProducts)}</p>
        <button
          onClick={() =>
            fetchToken({ email: 'user@gmail.com', password: 'user_pw' })
          }
        >
          Login
        </button>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthTest);
