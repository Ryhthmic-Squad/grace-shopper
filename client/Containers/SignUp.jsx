import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input } from '../components/styles/Forms';
import FeaturedButton from '../components/styles/FeaturedButton';
import { connect } from 'react-redux';
import { resetAuth } from '../store/auth/auth';
import { fetchToken, resetToken } from '../store/auth/token';
import axios from 'axios';

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (credentials) => dispatch(fetchToken(credentials)),
  resetAuth: () => dispatch(resetAuth()),
  resetToken: () => dispatch(resetToken()),
});

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const token = window.localStorage.getItem('token');
    try {
      await axios.post(
        '/api/users',
        { ...this.state },
        { headers: { authorization: token } }
      );
      this.logIn({
        email,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // can be combined with above
  logIn = (credentials) => {
    const { fetchToken } = this.props;
    fetchToken(credentials);
  };

  render() {
    const { onChange, onSubmit } = this;
    const { email, password, firstName, lastName, phoneNumber } = this.state;
    return (
      <>
        <FormGroup onSubmit={onSubmit}>
          <h2>I'm New Here!</h2>
          <p>
            If you are an existing user, log in <Link to="/login">here</Link>
          </p>
          <Label>First Name:</Label>
          <Input value={firstName} onChange={onChange} name="firstName" />
          <Label>Last Name:</Label>
          <Input value={lastName} onChange={onChange} name="lastName" />
          <Label>Email:</Label>
          <Input value={email} onChange={onChange} name="email" />
          <Label>Phone Number:</Label>
          <Input value={phoneNumber} onChange={onChange} name="phoneNumber" />
          <Label>Password:</Label>
          <Input
            value={password}
            onChange={onChange}
            type="password"
            name="password"
          />
          <FeaturedButton>Sign Up</FeaturedButton>
        </FormGroup>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
