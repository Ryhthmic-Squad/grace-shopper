import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';

// Filter users based on 'isAdmin' attribute

class UserDashboard extends Component {
  state = {
    auth: {},
    existingUsers: [],
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
      const { data: existingUsers } = await axios.get('/api/users');
      // for future referenc: {headers: { authorization: token }} may be required for loading user orders
      this.setState({ auth, existingUsers });
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
    const { auth, existingUsers } = this.state;
    const { signIn, logout } = this;
    if (!auth.id) {
      return <Login signIn={signIn} />;
    } else {
      return (
        <div>
          Welcome {auth.username}
          {existingUsers.length && (
            <ul>
              {existingUsers.map((user) => (
                <li key={user.id}>{user.fullName}</li>
              ))}
            </ul>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      );
    }
  }
}

export default UserDashboard;
