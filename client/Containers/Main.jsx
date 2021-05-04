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
<<<<<<< HEAD
import FeaturedButton from '../components/styles/FeaturedButton';
import LandingPage from '../components/styles/LandingPage.js';
=======
>>>>>>> main
import HomePage from '../Containers/HomePage';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    console.log('Main', this.props);
    return (
<<<<<<< HEAD
      <Router>
        <MainNav />

        <div>
          {/* <Route component={MainNav} /> */}
          <Route component={AllProducts} path="/products" exact />
          <Route component={UserDashboard} path="/login" exact />
          <Route component={HomePage} path="/" exact />
          <hr />
          <Link to="/products">
            <FeaturedButton> Shop All Furniture </FeaturedButton>
          </Link>
          <hr />
          <TestProductList />
        </div>
      </Router>
=======
      <>
        <Router>
          <MainNav />
          <Route component={HomePage} path="/" exact />
          <div id="container">
            {/* <Route component={MainNav} /> */}
            <Route component={AllProducts} path="/products" exact />
            <Route component={UserDashboard} path="/login" exact />
          </div>
        </Router>
      </>
>>>>>>> main
    );
  }
}

export default connect(null, null)(Main);
