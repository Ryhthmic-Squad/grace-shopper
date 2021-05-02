import React, { Component } from 'react';
import { connect } from 'react-redux';
class NewUsers extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: [],
    };
  }
  async componentDidMount() {
    const { fetchUsers, users } = this.props;
    await fetchUsers();
    this.state.users = users;
    this.state.loading = false;
  }
  render() {
    const { loading, users } = this.state;
    return loading ? (
      <h1>Loading</h1>
    ) : (
      <div>
        <h2>New Users</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>phoneNumber</th>
              </tr>
            </thead>
            {users.length ? (
              users.map((user) => (
                <tbody>
                  <tr>
                    <td>{user.id}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.phoneNumber}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div>
          <Link to={`id/AdminConsole/all/users`}>Show All Users</Link>
        </div>
      </div>
    );
  }
}
//need to make and import user thunks and state
const mapStateToProps = (state) => {
  const users = state.users
    .sort((a, b) => b.createdAt.substring(0, 10) - a.createdAt.substring(0, 10))
    .filter((user) => !user.isAdmin)
    .slice(2);
  return {
    users,
  };
};
const MapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, MapDispatchToProps)(NewUsers);
