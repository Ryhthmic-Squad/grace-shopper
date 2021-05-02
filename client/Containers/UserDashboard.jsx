import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import AdminConsole from './AdminConsole';
import Button from '../components/styles/Button';

// Filter users based on 'isAdmin' attribute

class UserDashboard extends Component {
  state = {
    auth: {},
  };

  logout = () => {
    window.localStorage.removeItem('token');
    this.setState({ auth: {} });
  };

  attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const { data: auth } = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      // for future referenc: {headers: { authorization: token }} may be required for loading user orders
      this.setState({ auth });
    }
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
    const { auth } = this.state;
    const { signIn, logout } = this;
    if (!auth.id) {
      return <Login signIn={signIn} />;
    } else {
      return (
        <div>
          <h3>Welcome {auth.firstName}</h3>
          {auth.isAdmin && <AdminConsole />}
          <Button onClick={logout}>Logout</Button>
        </div>
      );
    }
  }
}

export default UserDashboard;
