import React, { Component } from 'react';
import RecentOrders from './RecentOrders';
import NewUsers from './NewUsers';
import Inventory from './Inventory';
import { HashRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { Row, Spacer } from '../../components/styles/AdminConsole';
import AllUsers from './AllUsers.jsx';
import AllInventory from './AllInventory.jsx';
import AllOrders from './AllOrders.jsx';
import AddProduct from './AddProduct';
class AdminConsole extends Component {
  render() {
    return (
      <Router>
        <Route component={AllInventory} path="/AdminConsole/inventory" exact />
        <Route component={AllOrders} path="/AdminConsole/orders" exact />
        <Route component={AddProduct} path="/AdminConsole/addproduct" exact />
        <Row>
          <NewUsers />
          <Spacer m={4} />
          <RecentOrders />
          <Spacer m={4} />
          <Inventory />
        </Row>
      </Router>
    );
  }
}
export default AdminConsole;
