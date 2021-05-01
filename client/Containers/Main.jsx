import React, { Component } from 'react';
import UserDashboard from './UserDashboard';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <div>
        <hr />
        <UserDashboard />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProductList: () => dispatch(fetchProductList()),
});

export default connect(null, mapDispatchToProps)(Main);
