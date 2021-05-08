import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList } from '../../store/user/userList';
import { Row } from '../../components/styles/AdminConsole';
import { HashRouter as Router } from 'react-router-dom';
import Button from '../../components/styles/Button';
import { deleteUser } from '../../store/user/userDelete';
class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    const { fetchUsers } = this.props;
    await fetchUsers();
    this.setState({ users: this.props.users });
  }
  delUser = (id) => {
    const { deleteuser } = this.props;
    deleteuser(id);
  };
  render() {
    const { delUser } = this;
    const { users } = this.state;
    return (
      <div>
        <h2>All Users</h2>
        <Row>
          <strong>Name</strong>
          <strong>Email</strong>
          <strong>isAdmin</strong>
          <strong>Phone Number</strong>
        </Row>
        <hr />
        <ul>
          {users.length ? (
            users.map((user) => (
              <Row key={user.id}>
                <span>{user.fullName}</span>
                <span>{user.email}</span>
                <span>{user.isAdmin}</span>
                <span>{user.phoneNumber}</span>
                <Button
                  onClick={() => {
                    window.location = `#/AdminConsole/users/edit/${user.id}`;
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    delUser(user.id);
                  }}
                >
                  Delete
                </Button>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const users = state.userList.users.sort(
    (user1, user2) =>
      new Date(user1.createdAt.slice(0, 10)) -
      new Date(user2.createdAt.slice(0, 10))
  );

  return {
    users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUserList()),
    deleteuser: (id) => dispatch(deleteUser(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
