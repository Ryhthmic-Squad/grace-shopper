import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainNav extends Component {
  render() {
    return (
      <div>
        <Link to="/"> A Space Apart </Link>
        <Link to="api/products/all"> Shop All Furniture </Link>
      </div>
    );
  }
}
export default MainNav;
