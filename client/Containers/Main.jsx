import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import AllProducts from './AllProducts';
import MainNav from './MainNav';

class Main extends Component {
  render() {
    return (
      <div>
        <hr />
        <MainNav />
        <Login />
        <Router>
          <div>
            <Route component={AllProducts} path="/api/products/all" exact />
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
