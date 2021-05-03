import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Login from './Login.jsx';
import AdminConsole from './AdminConsole.jsx';
import Button from '../components/styles/Button';

// Filter users based on 'isAdmin' attribute
class UserDashboard extends Component {
  state = {
    auth: {},
    cartProducts: [], // this should be in store
  };

  logout = () => {
    window.localStorage.removeItem('token');
    this.setState({ auth: {}, cartProducts: [] });
  };

  attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const { data: auth } = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      const { data: cartProducts } = await axios.get(
        `/api/users/${auth.id}/cart`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      this.setState({ auth, cartProducts });
    }
    // else generate guest token for user to he/she can build a temporary cart
    // that cart can be persisted in a logged account whenever he/she/signs up
  };
  componentDidMount() {
    this.attemptTokenLogin();
  }
  signIn = async (credentials) => {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  };
  render() {
    const { auth, cartProducts } = this.state;
    const { signIn, logout } = this;
    if (!auth.id) {
      return <Login signIn={signIn} />;
    } else {
      return (
        <div>
          <h3>Welcome {auth.firstName}</h3>
          <h3>Cart Products</h3>
          {cartProducts.length &&
            cartProducts.map((product) => (
              <li>
                {product.name},{product.cartProducts.quantity}
              </li>
            ))}
          {auth.isAdmin && <AdminConsole />}
          <Button onClick={logout}>Logout</Button>
        </div>
      );
    }
  }
}

export default UserDashboard;
