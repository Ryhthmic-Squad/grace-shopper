# Guest Checkout Flow Conditions

## Guest does not sign in and checks out

- A guest token is created for that user, and a cart is created for that gets saved in the backend
- When the guest decides to checkout a 'guest checkout button' appears instead of the regular checkout button. This button should fire:
  - guest-checkout view with form fields, not including password.
  - guest hits 'submit' and the following actions happen:
    - a user account is created for the user, with a null password using `POST /api/users/`
    - grab the cartId from store
    - the new user account ID is set to that cart
    - functionality required for stripe to work like the regular checkout process
