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
        <Link id="logo" to="/" className="text-link">
          A&nbsp;Space&nbsp;Apart
        </Link>
        <Link to="/login" className="text-link">
          Login
        </Link>
        {
          //the above will lead to the user dashboard login component(welcome back! or im new here!)
        }
        <Link to="/cart" className="text-link">
          Cart
        </Link>
      </MainNavDiv>
    );
  }
}
export default MainNav;
