import React, { Component } from 'react';
import RecentOrders from './RecentOrders';
import NewUsers from './NewUsers';
import Inventory from './Inventory';

export default class AdminConsole extends Component {
  render() {
    return (
      <div>
        <NewUsers />
        <RecentOrders />
        <Inventory />
      </div>
    );
  }
}
