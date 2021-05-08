import React, { Component } from 'react';
import { connect } from 'react-redux';
import Productcard from './Productcard';
import OrderSummary from './OrderSummary';
import styled from 'styled-components';

const mapStateToProps = (state) => {
  return {
    order: state.processOrder,
  };
};

class OrderDetails extends Component {
  itemCount = () => {
    let {
      order: { cartProducts },
    } = this.props;
    cartProducts = cartProducts || [];
    if (!cartProducts.length) return 0;
    return cartProducts.reduce((accum, item) => accum + item.quantity, 0);
  };

  render() {
    const { order } = this.props;
    const { itemCount } = this;
    let { cartProducts } = order;
    cartProducts = cartProducts || [];
    return (
      <>
        <Row id="cart">
          <Child>
            <h1>Cart: ({`${itemCount()}`})</h1>
            <hr className="heavy"></hr>
            {cartProducts.length ? (
              cartProducts.map((cartProduct) => (
                <Productcard
                  cartProduct={cartProduct}
                  key={cartProduct.productId}
                />
              ))
            ) : (
              <></>
            )}
          </Child>
          <OrderSummary cartProducts={cartProducts} />
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

export default connect(mapStateToProps, null)(OrderDetails);
