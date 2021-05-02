import React, { Component } from 'react';
import UserDashboard from './UserDashboard';
import { connect } from 'react-redux';
import TESTforProductList from './TESTforProductList';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <div>
        <hr />
        <TESTforProductList />
      </div>
    );
  }
}

export default connect(null, null)(Main);
