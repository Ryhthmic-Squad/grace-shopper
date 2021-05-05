import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
} from 'react-router-dom';
import AllProducts from './AllProducts.jsx';
import MainNav from './MainNav.jsx';
import HomePage from '../Containers/HomePage.jsx';
import Checkout from './Checkout/Checkout.jsx';
import AllUsers from './Admin/AllUsers.jsx';
import AllOrders from './Admin/AllOrders.jsx';
import AllInventory from './Admin/AllInventory.jsx';
import EditUser from './Admin/EditUser.jsx';
import AddProduct from './Admin/AddProduct.jsx';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    console.log('Main', this.props);
    return (
      <>
        <Router>
          <MainNav />
          <Route component={HomePage} path="/" exact />
          <div id="container">
            {/* <Route component={MainNav} /> */}
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
          </div>
        </Router>
      </>
    );
  }
}

export default connect(null, null)(Main);
