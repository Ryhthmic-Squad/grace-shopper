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
    const { fetchProductList } = this.props;
    return (
      <Router>
        <div>
          <Route component={MainNav} />
          <Route component={AllProducts} path="/api/product/all" exact />
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

const mapDispatchToProps = (dispatch) => ({
  fetchProductList: () => dispatch(fetchProductList()),
});

export default connect(null, mapDispatchToProps)(Main);
