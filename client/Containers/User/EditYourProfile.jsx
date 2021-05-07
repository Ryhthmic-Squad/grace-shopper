import React, { Component } from 'react';
import { FormGroup, Label, Input } from '../../components/styles/Forms';
import FeaturedButton from '../../components/styles/FeaturedButton';
import { connect } from 'react-redux';
import { updateUserData } from '../../store/user/userUpdate';
import { fetchUserList } from '../../store/user/userList';
import axios from 'axios';
class EditYourProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  };
  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    let authorized;
    if (token) {
      const { data: auth } = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      authorized = auth;
    }
    const { fetchUsers } = this.props;
    await fetchUsers();
    const user = this.props.users.find((user) => user.id === authorized.id);
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { updateUser } = this.props;
    updateUser({ ...this.props.user, ...this.state });
    window.location = '#/login';
  };

  render() {
    const { onChange, onSubmit } = this;
    const { email, password, lastName, firstName, phoneNumber } = this.state;
    return (
      <>
        <FormGroup onSubmit={onSubmit}>
          <h2>Your Profile</h2>
          <Label>First Name:</Label>
          <Input value={firstName} onChange={onChange} name="firstName" />
          <Label>Last Name:</Label>
          <Input value={lastName} onChange={onChange} name="lastName" />
          <Label>Email:</Label>
          <Input value={email} onChange={onChange} name="email" />
          <Label>Phone Number:</Label>
          <Input value={phoneNumber} onChange={onChange} name="phoneNumber" />
          <Label>Password:</Label>
          <Input value={password} onChange={onChange} name="password" />
          <FeaturedButton>Submit</FeaturedButton>
        </FormGroup>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const users = state.userList.users;

  return {
    users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUserList()),
    updateUser: (user) => dispatch(updateUserData(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditYourProfile);
