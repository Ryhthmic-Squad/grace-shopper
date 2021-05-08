const COPY_CART_PRODUCTS = 'COPY_CART_PRODUCTS';
export const copyCartProducts = (cartProducts) => ({
  type: COPY_CART_PRODUCTS,
  cartProducts,
});

const initialState = [];

export default (state = initialState, action) => {
  const { type, cartProducts } = action;
  if (type === COPY_CART_PRODUCTS) return cartProducts;
  return state;
};
