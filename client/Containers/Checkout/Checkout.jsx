import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import Button from '../../components/styles/Button';
const stripePromise = loadStripe(
  'pk_test_51InzHlFBTivT4al21JN3Jex1hItFC4HXkyriQPWUAD2O2kMglUX41AkmutusPJeU3XMpQz1XBbXkAaEUtD5yHWB500crd0rLxt'
);

function Checkout(props) {
  const { products, id } = props;

  //const { userId } = await axios.get(`/api/carts/${cartProducts.cartId}`);
  const arr = products.map((product) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.product.name,
        },
        unit_amount: product.product.price * 100,
      },
      quantity: product.quantity,
    };
  });
  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await axios.post('/create-checkout-session', {
      payment_method_types: ['card'],
      client_reference_id: id,
      line_items: arr,

      mode: 'payment',
      success_url: `${window.location.origin}`,
      cancel_url: 'http://localhost:3000/#/cart',
    });

    const session = response.data;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <Button role="link" onClick={handleClick}>
      Checkout
    </Button>
  );
}
export default Checkout;
