import axios from 'axios';

export const SET_PRODUCT_INVENTORY = 'SET_PRODUCT_INVENTORY';

export const setProductInventory = (productInventory) => ({
  productInventory,
  type: SET_PRODUCT_INVENTORY,
});

export const fetchProductInventory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('api/Products/all');
      dispatch(setProductInventory(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  products: [],
};
export default (state = initialState, action) => {
  const { type, productInventory } = action;
  if (type === SET_PRODUCT_INVENTORY) return { products: productInventory };
  else return state;
};
