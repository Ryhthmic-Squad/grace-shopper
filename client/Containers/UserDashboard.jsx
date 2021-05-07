import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth, resetAuth } from '../store/auth/auth';
import { setToken, fetchToken, resetToken } from '../store/auth/token';
import { fetchCartProducts, resetCart } from '../store/cart/cart';
import Button from '../components/styles/Button';
import AdminConsole from '../Containers/Admin/AdminConsole';
import UserConsole from './User/UserConsole';

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
  resetAuth: () => dispatch(resetAuth()),
  resetToken: () => dispatch(resetToken()),
  resetCart: () => dispatch(resetCart()),
});

class UserDashboard extends Component {
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
    const { auth } = this.props;
    const { logOut } = this;
    return (
      <div>
        {auth.isAdmin && <AdminConsole />}
        {!auth.isAdmin && <UserConsole />}
        {auth.email && <Button onClick={logOut}>Log Out</Button>}
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
