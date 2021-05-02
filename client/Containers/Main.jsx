import React, { Component } from 'react';
import UserDashboard from './UserDashboard';
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

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <Router>
        <div>
          <div>
            <Route component={MainNav} />
            <Route component={AllProducts} path="/api/product/all" exact />
          </div>
          <hr />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProductList: () => dispatch(fetchProductList()),
});

export default connect(null, mapDispatchToProps)(Main);
