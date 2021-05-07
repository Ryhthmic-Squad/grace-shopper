import React, { Component } from 'react';
import { FormGroup, Label, Input } from '../../components/styles/Forms';
import FeaturedButton from '../../components/styles/FeaturedButton';
import { connect } from 'react-redux';
import { updateUserData } from '../../store/user/userUpdate';
import { fetchUserList } from '../../store/user/userList';

class EditUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isAdmin: false,
  };
  async componentDidMount() {
    const { fetchUsers } = this.props;
    await fetchUsers();
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
      isAdmin: this.props.user.isAdmin,
    });
  }
  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { updateUser } = this.props;
    updateUser({ ...this.props.user, ...this.state });
    window.location = '#/AdminConsole/users';
  };

  render() {
    const { onChange, onSubmit } = this;
    const {
      email,
      password,
      lastName,
      firstName,
      phoneNumber,
      isAdmin,
    } = this.state;
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
          <Label>isAdmin:</Label>
          <Input
            type="slider"
            value={isAdmin}
            onChange={onChange}
            name="isAdmin"
          />
          <FeaturedButton>Submit</FeaturedButton>
        </FormGroup>
      </>
    );
  }
}
const mapStateToProps = (state, OwnProps) => {
  const user = state.userList.users.find(
    (user) => user.id == OwnProps.match.params.id
  );
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUserList()),
    updateUser: (user) => dispatch(updateUserData(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
