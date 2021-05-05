import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';

import AllProducts from './AllProducts.jsx';
import MainNav from './MainNav.jsx';
import HomePage from '../Containers/HomePage.jsx';
import Checkout from './Checkout/Checkout.jsx';
import AllUsers from './Admin/AllUsers.jsx';
import AllOrders from './Admin/AllOrders.jsx';
import AllInventory from './Admin/AllInventory.jsx';
import EditUser from './Admin/EditUser.jsx';
import AddProduct from './Admin/AddProduct.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <>
        <Router>
          <MainNav />
          <Switch>
            <Route component={HomePage} path="/" exact />
            <Route component={AllProducts} path="/products" exact />
            <Route component={UserDashboard} path="/login" exact />

            <Route component={Checkout} path="/checkout" exact />
            <Route component={AllUsers} path="/AdminConsole/users" exact />
            <Route component={AllOrders} path="/AdminConsole/orders" exact />
            <Route
              component={AllInventory}
              path="/AdminConsole/inventory"
              exact
            />
            <Route
              exact
              path="/AdminConsole/users/edit/:id"
              component={EditUser}
            />
            <Route
              component={AddProduct}
              path="/AdminConsole/addproduct"
              exact
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(null, null)(Main);
