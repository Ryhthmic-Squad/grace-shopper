import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';
import TestProductList from './TestForProductList.jsx';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from 'react-router-dom';
import AllProducts from './AllProducts';
import MainNav from './MainNav';
import FeaturedButton from '../components/styles/FeaturedButton';

class Main extends Component {
  render() {
    return (
      <Router>
        <MainNav />
        <Switch>
          <Route component={AllProducts} path="/products" exact />
          <Route component={TestProductList} path="/productsTest" exact />
          <Route component={UserDashboard} path="/login" exact />
          <Route>
            <hr />
            <Link
              to={
                '/productsTest?page=1&size=6&sort=name,ASC&type=&style=&room='
              }
            >
              <FeaturedButton> Shop All Furniture </FeaturedButton>
            </Link>
            <hr />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(null, null)(Main);
