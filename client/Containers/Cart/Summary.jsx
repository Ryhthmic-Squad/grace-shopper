import React from 'react';
import FeaturedButton from '../../components/styles/FeaturedButton';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { resetCart } from '../../store/cart/cart';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartcopy: state.processOrder,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCart: () => dispatch(resetCart()),
  };
};

const Summary = ({ user, cart, auth }) => {
  let { cartProducts } = cart;
  cartProducts = cartProducts || [];
  console.log('the user', user);
  console.log('the cart Products', cartProducts);
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

      {auth.email && (
        <Checkout id={user} products={cartProducts} reset={resetCart} />
      )}
      {!auth.email && (
        <Link to="/cart/guestcheckout">
          <FeaturedButton>Guest Checkout</FeaturedButton>
        </Link>
      )}
    </SummaryCard>
  );
};

const SummaryCard = styled.div`
  background: #e5e5e5;
  padding: 1rem 2rem 2rem 2rem;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
