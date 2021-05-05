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

export const resetCartProducts = () => ({
  type: RESET_CART,
  cartProducts: [],
});

export const resetCart = () => {
  return (dispatch) => {
    dispatch(resetCartProducts());
  };
};

export const addProduct = (products) => ({
  type: ADD_PRODUCT,
  cartProducts: [...products],
});

// export const addProductAndCheckQty = async (id, qty) => {
//   //logic
//   try {
//     const { data: selectedProduct } = await axios.get(
//       `/api/products/Byid/${id}`
//     );
//     // send message on low inventory - will be done in component, different reducer file
//     if (qty < selectedProduct.inventory)
//       return (dispatch) => {
//         dispatch(addProduct(product));
//       };
//   } catch (err) {
//     console.error;
//   }
// };

const initialState = [];

export default (state = initialState, action) => {
  const { type, cartProducts } = action;
  if (type === SET_CART_PRODUCTS) return cartProducts;
  if (type === RESET_CART) return cartProducts;
  return state;
};
