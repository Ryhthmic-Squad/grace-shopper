import axios from 'axios';

export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const setCartProducts = (cartProducts) => ({
  type: SET_CART_PRODUCTS,
  cartProducts,
});

// fetchCartProducts is a thunk that needs a userId to get all products associated with a cart.
export const fetchCartProducts = (id) => {
  return async (dispatch) => {
    try {
      const { data: cartProducts } = await axios.get(`/api/users/${id}/cart`);
      dispatch(setCartProducts(cartProducts));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  const { type, cartProducts } = action;
  if (type === SET_CART_PRODUCTS) return cartProducts;
  else return state;
};
