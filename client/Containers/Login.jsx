import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  //componentDidUpdate
  //perform axios call to authenticate user

  async handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const credentials = {email: this.state.email, password: this.state.password};
    const {token} = (await axios.post('/api/auth', credential)).data;
    window.localStorage.setIten('token', token);
    this.setState({ email: '', password: '' });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ ...this.state, [name]: [value] });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    console.log('render():', this.state);
    return (
      <div>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
