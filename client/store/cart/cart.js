import axios from 'axios';

export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const INCREASE_QTY = 'INCREASE_QTY';
export const DESCREASE_QTY = 'DECREASE_QTY';
export const RESET_CART = 'RESET_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const setCartProducts = (cartProducts) => ({
  type: SET_CART_PRODUCTS,
  cartProducts,
});

// How to deal with low-inventory

// fetchCartProducts is a thunk that needs a userId to get all products associated with a cart.
export const fetchCartProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      console.log('FROM: fetchCartProducts', token);
      const { data: cartProducts } = await axios.get(`/api/carts`, {
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

export const updateCartProduct = ({ productId, quantity }) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState();
      const { data: cartProducts } = await axios.put(
        `/api/carts`,
        { productId, quantity },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setCartProducts(cartProducts));
    } catch (err) {
      console.error(err);
    }
  };
};

export const resetCartProducts = () => ({
  type: RESET_CART,
  cartProducts: [],
});

export const resetCart = () => {
  return async (dispatch, getState) => {
    const { token } = getState();
    try {
      const response = await axios.put('/api/carts/clear', null, {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        dispatch(resetCartProducts());
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const addProduct = (products) => ({
  type: ADD_PRODUCT,
  cartProducts: [...products],
});

const initialState = [];

export default (state = initialState, action) => {
  const { type, cartProducts } = action;
  if (type === SET_CART_PRODUCTS) return cartProducts;
  if (type === RESET_CART) return cartProducts;
  return state;
};
