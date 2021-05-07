import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MainNavDiv, Admin } from '../components/styles/MainNavDiv';
import { connect } from 'react-redux';
import { resetAuth } from '../store/auth/auth';
import { resetToken } from '../store/auth/token';
import { resetCart } from '../store/cart/cart';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  resetAuth: () => dispatch(resetAuth()),
  resetToken: () => dispatch(resetToken()),
  resetCart: () => dispatch(resetCart()),
});

class MainNav extends Component {
  logOut = () => {
    const { resetAuth, resetToken, resetCart } = this.props;
    window.localStorage.removeItem('token');
    resetAuth();
    resetToken();
    resetCart();
  };

  render() {
    const { auth } = this.props;
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
        <Link to="/dashboard" className="text-link">
          {auth.email ? `Welcome ${auth.firstName}!` : `Sign In/Up`}
        </Link>
        &nbsp;{auth.isAdmin && <Admin>(Admin)</Admin>}&nbsp;&nbsp;&nbsp;
        {auth.email && (
          <Link to="/" className="text-link" onClick={this.logOut}>
            Sign&nbsp;Out
          </Link>
        )}
        {
          //the above will lead to the user dashboard login component(welcome back! or im new here!)
        }
        &nbsp;&nbsp;&nbsp;
        <Link to="/cart" className="text-link">
          Cart
        </Link>
      </MainNavDiv>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
