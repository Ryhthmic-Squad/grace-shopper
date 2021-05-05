import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './AllProducts';
import MainNav from './MainNav';
import HomePage from '../Containers/HomePage';

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
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(null, null)(Main);
