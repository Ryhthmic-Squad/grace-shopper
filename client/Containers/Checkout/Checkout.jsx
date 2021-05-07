import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import Button from '../../components/styles/Button';
const stripePromise = loadStripe(
  'pk_test_51InzHlFBTivT4al21JN3Jex1hItFC4HXkyriQPWUAD2O2kMglUX41AkmutusPJeU3XMpQz1XBbXkAaEUtD5yHWB500crd0rLxt'
);

function Checkout() {
  const handleClick = async (event) => {
    // Get Stripe.js instance

    const stripe = await stripePromise;
    // the order id is passed into checkout -> order
    // order => {order.id} passed in as a prop
    const order = 123445555;
    //const amount = order.Product// multiply quant by price
    // const price = amount.toString()+'00'
    // unit_amount = Number(price)
    // quantity => the number of items
    // Call your backend to create the Checkout Session
    const response = await axios.post('/create-checkout-session', {
      payment_method_types: ['card'],
      client_reference_id: order,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Checkout',
            },
            unit_amount: 4533,
          },
          quantity: 1,
        },
      ],

      mode: 'payment',
      success_url: `${window.location.origin}`,
      cancel_url: 'http://localhost:3000/#/checkout',
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
