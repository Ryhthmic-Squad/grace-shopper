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
import AllProducts from './AllProducts';
import MainNav from './MainNav';
import FeaturedButton from '../components/styles/FeaturedButton';
import AllUsers from './Admin/AllUsers.jsx';
import AddProduct from './Admin/AddProduct.jsx';
import AllInventory from './Admin/AllInventory.jsx';
import AllOrders from './Admin/AllOrders.jsx';
import EditUser from './Admin/EditUser.jsx';

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={MainNav} />
          <Route
            component={EditUser}
            exact
            path="/AdminConsole/users/edit/:id"
          />
          <Route component={AllProducts} path="/products" exact />
          <Route component={UserDashboard} path="/login" exact />
          <Route component={AllUsers} exact path="/AdminConsole/users" />
          <Route component={AddProduct} exact path="/AdminConsole/addproduct" />
          <Route
            component={AllInventory}
            exact
            path="/AdminConsole/inventory"
          />
          <Route component={AllOrders} exact path="/AdminConsole/orders" />

          <hr />
          <Link to="/api/product/all">
            <FeaturedButton> Shop All Furniture </FeaturedButton>
          </Link>

          <hr />
          <hr className="heavy" />
          <TestProductList />
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(Main);
