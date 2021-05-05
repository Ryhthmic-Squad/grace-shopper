import React, { Component } from 'react';
import UserDashboard from './UserDashboard.jsx';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './AllProducts';
import MainNav from './MainNav';
import HomePage from '../Containers/HomePage';
import { fetchToken } from '../store/auth/token.js';

const mapDispatchToProps = (dispatch) => ({
  initAuth: () => dispatch(fetchToken({ email: null, password: null })),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

class Main extends Component {
  componentDidMount = () => {
    const { initAuth } = this.props;
    const token = window.localStorage.getItem('token');
    if (!token) {
      initAuth();
    }
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
