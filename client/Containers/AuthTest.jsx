import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth, resetAuth } from '../store/auth/auth';
import { setToken, fetchToken, resetToken } from '../store/auth/token';
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
  resetAuth: () => dispatch(resetAuth()),
  resetToken: () => dispatch(resetToken()),
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

  logOut = () => {
    const { resetAuth, resetToken } = this.props;
    window.localStorage.removeItem('token');
    resetAuth();
    resetToken();
  };

  render = () => {
    const { auth, token, cartProducts, fetchToken } = this.props;
    const { logOut } = this;
    return (
      <div>
        <h1>Auth Test</h1>
        <p>This is our token: {token}</p>
        <p>This is our cart: {JSON.stringify(cartProducts)}</p>
        {!auth.email && (
          <button
            onClick={() =>
              fetchToken({ email: 'user@gmail.com', password: 'user_pw' })
            }
          >
            Login
          </button>
        )}
        {auth.email && <button onClick={logOut}>Log Out</button>}
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthTest);
