import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';

// Filter based on isAdmin attribute of user

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      existingUsers: [],
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    window.localStorage.removeItem('token');
    this.setState({ auth: {} });
  }
  async attemptTokenLogin() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      const existingUsers = await axios.get('/api/users');
      // headers: {
      //   authorization: token,
      // }
      // console.log(existingUsers.data);
      this.setState({ auth: response.data, existingUsers: existingUsers.data });
    }
  }
  componentDidMount() {
    this.attemptTokenLogin();
  }
  async signIn(credentials) {
    //console.log('-----> UserDashboard, signIn', credentials);
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    // console.log('-----> UserDashboard, response', response);
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  }
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
