import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signIn({
      email,
      password,
    });
  };

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label>email:</label>
        <input value={email} onChange={onChange} name="email" />
        <br />
        <label>Password:</label>
        <input
          value={password}
          onChange={onChange}
          type="password"
          name="password"
        />
        <br />
        <button>Sign In</button>
      </form>
    );
  }
}

export default Login;
