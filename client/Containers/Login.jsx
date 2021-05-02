import React, { Component } from 'react';
import { FormGroup, Label, Input } from '../components/styles/Forms';
import FeaturedButton from '../components/styles/FeaturedButton';

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
      <>
        <FormGroup onSubmit={onSubmit}>
          <h2>Welcome Back!</h2>
          <Label>email:</Label>
          <Input value={email} onChange={onChange} name="email" />
          <Label>password:</Label>
          <Input
            value={password}
            onChange={onChange}
            type="password"
            name="password"
          />
          <FeaturedButton>Log In</FeaturedButton>
        </FormGroup>
      </>
    );
  }
}

export default Login;
