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
import LandingPage from '../components/styles/LandingPage.js';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <Router>
        <MainNav />
        <LandingPage>
          <div>
            {/* <Route component={MainNav} /> */}
            <Route component={AllProducts} path="/products" exact />
            <Route component={UserDashboard} path="/login" exact />
            <hr />
            <Link to="/products">
              <FeaturedButton> Shop All Furniture </FeaturedButton>
            </Link>
            <hr />
            <TestProductList />
          </div>
        </LandingPage>
      </Router>
    );
  }
}

export default connect(null, null)(Main);
