import axios from 'axios';

export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const RESET_CART = 'RESET_CART';

export const setCartProducts = (cartProducts) => ({
  type: SET_CART_PRODUCTS,
  cartProducts,
});

export const resetCart = () => ({
  type: RESET_CART,
  cartProducts: [],
});

// fetchCartProducts is a thunk that needs a userId to get all products associated with a cart.
export const fetchCartProducts = (id, token) => {
  return async (dispatch) => {
    try {
      const { data: cartProducts } = await axios.get(`/api/users/${id}/cart`, {
        headers: {
          authorization: token,
        },
      });
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
  if (type == RESET_CART) return cartProducts;
  else return state;
};
