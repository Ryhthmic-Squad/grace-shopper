import axios from 'axios';

export const SET_PRODUCT_INVENTORY = 'SET_PRODUCT_INVENTORY';

export const setProductInventory = (productInventory) => ({
  productInventory,
  type: SET_PRODUCT_LIST,
});

export const fetchProductInventory = () => {
  return async (dispatch) => {
    const { data } = await axios.get('api/products/all');
    co;
  };
};
