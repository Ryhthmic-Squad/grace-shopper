import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList } from '../../store/user/userList';
import { Row } from '../../components/styles/AdminConsole';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import Button from '../../components/styles/Button';
import AllUsers from './AllUsers';
class NewUsers extends Component {
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

  render() {
    const { users } = this.state;
    return (
      <div>
        <Router>
          <Route component={AllUsers} exact path="/AdminConsole/users" />
        </Router>

        <h2>New Users</h2>
        <hr className="heavy" />

        <Row>
          <strong>Name</strong>
          <strong>Sign-up Date</strong>
        </Row>
        <hr />
        <ul>
          {users.length ? (
            users.map((user) => (
              <Row key={user.id}>
                <span>{user.fullName}</span>
                <span>{user.createdAt.slice(0, 10)}</span>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </ul>
        <Button
          onClick={() => {
            window.location = '#/AdminConsole/users';
          }}
        >
          Show All Users
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const users = state.userList.users
    .sort(
      (user1, user2) =>
        new Date(user1.createdAt.slice(0, 10)) -
        new Date(user2.createdAt.slice(0, 10))
    )
    .filter((user) => !user.isAdmin);

  if (users.length > 3) users.slice(3);

  return {
    users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUserList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUsers);
