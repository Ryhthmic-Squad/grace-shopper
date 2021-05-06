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
      cart: { products },
    } = this.props;
    products = products || [];
    if (!products.length) return 0;
    if (products.length === 1) return products[0].cartProducts.quantity;
    return products.reduce(
      (a, b) => a.cartProducts.quantity + b.cartProducts.quantity
    );
  };

  render() {
    const { cart } = this.props;
    const { itemCount } = this;
    let { products } = cart;
    products = products || [];
    return (
      <>
        <Row id="cart">
          <Child>
            <h1>Cart: ({`${itemCount()}`})</h1>
            <hr className="heavy"></hr>
            {products.length ? (
              products.map((product) => (
                <ProductCard productId={product.id} key={product.id} />
              ))
            ) : (
              <></>
            )}
          </Child>
          <Summary products={products} />
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
