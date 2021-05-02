import axios from 'axios';

export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const setCartItems = (cartItems) => ({
  type: SET_CART_ITEMS,
  cartItems,
});

// fetchCartItems is a thunk that needs a foreign key userId to get all products associated with the user's cart.
export const fetchCartItems = (id) => {
  return async (dispatch) => {
    try {
      const { data: cartItems } = await axios.get(`/api/users/${id}/cart`);
      dispatch(setCartItems(cartItems));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, cartItems } = action;
  if (type === SET_CART_ITEMS) return cartItems;
  else return state;
};
