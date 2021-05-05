import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from 'react-router-dom';
import AllProducts from './AllProducts';
import MainNav from './MainNav';
import HomePage from '../Containers/HomePage';
import SingleProduct from './SingleProduct';

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
            <Route component={SingleProduct} path="/products/:id" exact />
          </div>
        </Router>
      </>
    );
  }
}

export default connect(null, null)(Main);
