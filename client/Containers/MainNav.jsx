import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MainNavDiv } from '../components/styles/MainNavDiv';

class MainNav extends Component {
  render() {
    return (
      <MainNavDiv className="main-nav">
        <input
          type="text"
          className="search-input"
          placeholder="Search here..."
        />
        <Link to="/" className="text-link">
          <a id="logo" className="nav">
            A Space Apart{' '}
          </a>
        </Link>
        <Link to="/login" className="text-link">
          <a className="nav">Login </a>
        </Link>
        {
          //the above will lead to the user dashboard login component(welcome back! or im new here!)
        }
        <Link to="/cart" className="text-link">
          <a className="cart">Cart</a>{' '}
        </Link>
      </MainNavDiv>
    );
  }
}
export default MainNav;
