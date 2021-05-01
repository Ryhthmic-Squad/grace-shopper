import React, { Component } from 'react';
import { HashRouter as Router, route, Link } from 'react-router-dom';
import Login from './Login';
import allProducts from './allProducts';

class Main extends Component {
  render() {
    return (
      <div>
        <hr />
        <allProducts />
        <Login />
        <Router>
          <div>
            <Route component={allProducts} path="/api/products/all" exact />
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
