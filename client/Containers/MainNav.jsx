import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MainNavDiv, InnerNavDiv } from '../components/styles/MainNavDiv';

class MainNav extends React.Component {
  render() {
    return (
      <MainNavDiv>
        <InnerNavDiv>
          <input
            type="text"
            className="search-input"
            placeholder="Search here..."
          />
        </InnerNavDiv>
        <InnerNavDiv>
          <Link to="/">
            <h1 className="nav">A Space Apart </h1>
          </Link>
        </InnerNavDiv>
        <InnerNavDiv>
          <Link to="/login">
            <h3 className="nav">Login </h3>
          </Link>
        </InnerNavDiv>
        {
          //the above will lead to the user dashboard login component(welcome back! or im new here!)
        }
        <InnerNavDiv>
          <Link to="/cart">
            <h3 className="cart">Cart</h3>{' '}
          </Link>
        </InnerNavDiv>
      </MainNavDiv>
    );
  }
}
export default MainNav;
