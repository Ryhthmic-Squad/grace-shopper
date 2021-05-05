import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends Component {
  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };

  render() {
    return (
      <StripeCheckout
        amount="500"
        billingAddress
        description="Awesome Product"
        locale="auto"
        name="YourDomain.tld"
        stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
        token={this.onToken}
        zipCode
      />
    );
  }
}
