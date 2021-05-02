import React, { Component } from 'react';
import UserDashboard from './UserDashboard';
import { connect } from 'react-redux';
import TestProductList from './TESTforProductList';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <div>
        <hr />
        <UserDashboard />
        <hr className="heavy" />
        <TestProductList />
      </div>
    );
  }
}

export default connect(null, null)(Main);
