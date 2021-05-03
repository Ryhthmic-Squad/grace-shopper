import axios from 'axios';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const createProduct = (product) => ({
  product,
  type: CREATE_PRODUCT,
});

export const createNewProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('api/Products/all');
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
  const { type, product } = action;
  if (type === CREATE_PRODUCT)
    return {
      products: state.products.concat(action.product),
    };
  else return state;
};
