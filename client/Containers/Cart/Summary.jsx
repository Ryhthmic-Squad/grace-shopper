import React from 'react';
import FeaturedButton from '../../components/styles/FeaturedButton';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { resetCart } from '../../store/cart/cart';
// need a checkout thunk that converts carts to orders

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCart: () => dispatch(resetCart()),
  };
};

const Summary = ({ cart, resetCart }) => {
  let { cartProducts } = cart;
  cartProducts = cartProducts || [];

  const orderTotal = () => {
    if (!cartProducts.length) return 0;
    return cartProducts.reduce(
      (accum, item) => accum + item.quantity * item.product.price,
      0
    );
  };

  return (
    <SummaryCard>
      <h3>Cart Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Merchandise</td>
            <td>${orderTotal()}</td>
          </tr>
          <tr>
            <td>Estimated Tax</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <td>Estimated Shipping</td>
            <td>$0.00</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Estimated Order Total</td>
            <td>${orderTotal()}</td>
          </tr>
        </tbody>
      </table>
      <FeaturedButton>Checkout Now</FeaturedButton>
    </SummaryCard>
  );
};

const SummaryCard = styled.div`
  background: #e5e5e5;
  padding: 1rem 2rem 2rem 2rem;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
