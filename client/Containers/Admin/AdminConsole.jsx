import React, { Component } from 'react';
import RecentOrders from './RecentOrders';
import NewUsers from './NewUsers';
import Inventory from './Inventory';
import { Row, Spacer } from '../../components/styles/AdminConsole';

export default class AdminConsole extends Component {
  render() {
    return (
      <Row>
        <NewUsers />
        <Spacer m={4} />
        <RecentOrders />
        <Spacer m={4} />
        <Inventory />
      </Row>
    );
  }
}
