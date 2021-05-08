import axios from 'axios';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const createProduct = (product) => ({
  product,
  type: CREATE_PRODUCT,
});

export const createNewProduct = (prod) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/products/all', prod);
      dispatch(createProduct(data));
    } catch (er) {
      console.log(er);
    }
  };
};

const initialState = {
  products: [],
};
export default (state = initialState, action) => {
  const { type, products } = action;
  if (type === CREATE_PRODUCT)
    return {
      products: state.products.concat(action.product),
    };
  else return state;
};
