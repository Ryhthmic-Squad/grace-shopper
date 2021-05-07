import React, { Component } from 'react';
import { connect } from 'react-redux';
//import axios from 'axios';
import Login from './Login.jsx';
import AdminConsole from '../Containers/Admin/AdminConsole';
import Button from '../components/styles/Button';
import UserConsole from './User/UserConsole';

import {
  fetchCartProducts,
  resetCart,
  updateCartProduct,
} from '../store/cart/cartProducts';
import { resetToken, fetchToken } from '../store/auth/token';
import { fetchAuth, resetAuth } from '../store/auth/auth';

// Filter users based on 'isAdmin' attribute
// move auth to store
// if initial state of cartProducts is empth and someone adds a product, create a new cart and store it in Local Storage
class UserDashboard extends Component {
  logout = () => {
    const { resetAuth, resetCart } = this.props;
    resetAuth();
    resetCart();
    resetToken();
    window.localStorage.removeItem('token');
  };

  attemptTokenLogin = async () => {
    const { fetchAuth, fetchCartProducts, auth } = this.props;
    const token = window.localStorage.getItem('token');
    // FETCH AUTH
    console.log('-----> 2 attemptTokenLogin', token);
    if (token) {
      await fetchAuth(token);
      console.log('-----> 3 attemptTokenLogin', auth);
      await fetchCartProducts(auth.id, token);
    }
    // else generate guest token for user to he/she can build a temporary cart
    // that cart can be persisted in a logged account whenever he/she/signs up
  };
  componentDidMount() {
    this.attemptTokenLogin();
  }
  componentDidUpdate = (prevProps) => {
    const { cartProducts: prevCartProducts } = prevProps;
    const { cartProducts } = this.props;
    console.log(prevCartProducts.updatedAt === cartProducts.updatedAt);
  };
  signIn = async (credentials) => {
    const { fetchToken } = this.props;
    console.log('-----> 1 signIn', credentials);
    // since guest user token is generated you must remove it when logging in as an authorized user
    // window.localStorage.removeItem('token'); // may be not needed bc new token will place current one?
    // let response = await axios.post('/api/auth', credentials);
    // const { token } = response.data;
    fetchToken(credentials);
    // window.localStorage.setItem('token', token);
    // this.attemptTokenLogin();
  };
  render() {
    console.log('rendering the page');
    const { cartProducts, auth, updateCartProduct } = this.props;
    const { signIn, logout } = this;
    if (!auth.id) {
      return <Login signIn={signIn} />;
    } else {
      return (
        <div>
          <h3>Welcome {auth.firstName}</h3>
          <h3>Cart Products</h3>
          {cartProducts.length &&
            cartProducts.map((product) => (
              <li>
                {product.name},{product.cartProducts.quantity}
                <br />
                <img display="block" width="150rem" src={product.imageUrl} />
              </li>
            ))}

          {!auth.isAdmin && <UserConsole />}
          <ul>
            {cartProducts.products &&
              cartProducts.products.map((product) => (
                <li key={product.id}>
                  {product.name},{product.cartProducts.quantity}
                  <br />
                  <img display="block" width="150rem" src={product.imageUrl} />
                  <br />
                  <button
                    onClick={() =>
                      updateCartProduct({ productId: product.id, quantity: 0 })
                    }
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      console.log(
                        'current quantity: ',
                        product.cartProducts.quantity
                      );
                      console.log(
                        'desired quantity: ',
                        product.cartProducts.quantity + 1
                      );
                      updateCartProduct({
                        productId: product.id,
                        quantity: product.cartProducts.quantity + 1,
                      });
                    }}
                  >
                    ADD 1
                  </button>
                </li>
              ))}
          </ul>
          {auth.isAdmin && <AdminConsole />}
          <Button
            onClick={() =>
              updateCartProduct({
                productId: '82f6e496-95ef-4eab-b1ac-8ceaa519b38d',
                quantity: 1,
              })
            }
          >
            Add Nelson Bed
          </Button>
          <Button onClick={logout}>Logout</Button>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuth: (token) => dispatch(fetchAuth(token)),
    fetchToken: (credentials) => dispatch(fetchToken(credentials)),
    fetchCartProducts: (id, token) => dispatch(fetchCartProducts(id, token)),
    updateCartProduct: ({ productId, quantity }) =>
      dispatch(updateCartProduct({ productId, quantity })),
    resetCart: () => dispatch(resetCart()),
    resetToken: () => dispatch(resetToken()),
    resetAuth: () => dispatch(resetAuth()),
  };
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
    auth: state.auth,
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
