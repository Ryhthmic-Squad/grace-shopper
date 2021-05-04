import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div>Cart if Empty</div>
        ) : (
          <div>You have {cartItems.length} in the cart</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
