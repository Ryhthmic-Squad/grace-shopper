import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Summary from './Summary';
import styled from 'styled-components';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

class Cart extends Component {
  itemCount = () => {
    let {
      cart: { cartProducts },
    } = this.props;
    cartProducts = cartProducts || [];
    if (!cartProducts.length) return 0;
    return cartProducts.reduce((accum, item) => accum + item.quantity, 0);
  };

  render() {
    const { cart } = this.props;

    const { itemCount } = this;
    let { cartProducts } = cart;
    cartProducts = cartProducts || [];
    return (
      <>
        <Row id="cart">
          <Child>
            <h1>Cart: ({`${itemCount()}`})</h1>
            <hr className="heavy"></hr>
            {cartProducts.length ? (
              cartProducts.map((cartProduct) => (
                <ProductCard
                  cartProduct={cartProduct}
                  key={cartProduct.productId}
                />
              ))
            ) : (
              <></>
            )}
          </Child>
          <Summary user={cart.userId} cartProducts={cartProducts} />
        </Row>
      </>
    );
  }
}

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

export const Child = styled.div`
  flex-grow: 2;
  padding-right: 2rem;
`;

export default connect(mapStateToProps, null)(Cart);
