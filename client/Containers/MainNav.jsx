import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserDashboard from './UserDashboard';

class MainNav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/"> A Space Apart </Link>
        <Link to="/api/products/all"> Shop All Furniture </Link>
        <UserDashboard />
      </nav>
    );
  }
}
export default MainNav;
