import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList } from '../../store/user/userList';
import { Row } from '../../components/styles/AdminConsole';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/styles/Button';

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
    this.setState({ users: this.props.users, loading: false });
  }
  handleClick = () => {
    let history = useHistory();
    history.push('/Admin/view/users');
  };
  render() {
    const { handleClick } = this;
    const { users } = this.state;
    return (
      <div>
        <h2>New Users</h2>
        <Row>
          <strong>Name</strong>
          <strong>Sign-up Date</strong>
        </Row>
        <ul>
          {users.length ? (
            users.map((user) => (
              <li key={user.id}>
                <Row>
                  <span>{user.fullName}</span>
                  <span>{user.createdAt.slice(0, 10)}</span>
                </Row>
              </li>
            ))
          ) : (
            <li>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </li>
          )}
        </ul>
        <Button onClick={handleClick}>Show All Users</Button>
        <Link to={'/Admin/view/users'}>Show All Users</Link>
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

  if (users.length > 3) users.slice(2);

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
