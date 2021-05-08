import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { fetchUserOrders } from '../../store/order/orderUser';
import axios from 'axios';
class OrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    const { fetchOrders } = this.props;
    if (token) {
      const { data: auth } = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      await fetchProducts(auth.id);
    }
    this.setState({ orderHistory: this.props.orders });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h2>Order History</h2>
        <hr className="heavy" />
        <Row>
          <strong>Id</strong>
          <strong>Products</strong>
          <strong>QTY</strong>
          <strong>Product Page</strong>
        </Row>
        <Row>
          {products.length ? (
            orderHistory.map((order) => (
              <Row key={order.id}>
                <span>{order.id}</span>
                <span>{order.createdAt.slice(0, 10)}</span>
                <span>{order.status}</span>
                <Button
                  onClick={() => {
                    window.location = `#/products/:id`;
                  }}
                >
                  Show Product Page
                </Button>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </Row>
        <Button
          onClick={() => {
            window.location = '#/users/orders';
          }}
        >
          Show All Orders
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, OwnProps) => {
  const orders = state.orderHistory.orders.find(
    (order) => order.id === OwnProps.match.params.id
  );
  return {
    orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (id) => dispatch(fetchUserOrders(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
