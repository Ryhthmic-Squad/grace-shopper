import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from '../../components/styles/AdminConsole';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import Button from '../../components/styles/Button';
import { fetchUserOrders } from '../../store/order/orderUser';
import axios from 'axios';
class YourRecentOrders extends Component {
  constructor() {
    super();
    this.state = {
      orderHistory: [],
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
      await fetchOrders(auth.id);
    }
    this.setState({ orderHistory: this.props.orders });
  }
  handleClick = () => {
    let dummy;
  };

  render() {
    const { handleClick } = this;
    const { orderHistory } = this.state;
    return (
      <div>
        <h2>Order History</h2>
        <hr className="heavy" />
        <Row>
          <strong>Order Id</strong>
          <strong>Date</strong>
          <strong>Status</strong>
          <strong>Details</strong>
        </Row>
        <Row>
          {orderHistory.length ? (
            orderHistory.map((order) => (
              <Row key={order.id}>
                <span>{order.id}</span>
                <span>{order.createdAt.slice(0, 10)}</span>
                <span>{order.status}</span>
                <Link to={`/users/orders/${order.id}`}>Show Order Details</Link>
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
        <Button onClick={handleClick}>Show All Orders</Button>
        <Link to={'/users/orders'}>Show All Orders</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const orders = state.orderHistory.orders
    .sort(
      (order1, order2) =>
        new Date(order1.createdAt.slice(0, 10)) -
        new Date(order2.createdAt.slice(0, 10))
    )
    .map((order) => {
      return {
        date: order.createdAt.slice(0, 10),
        id: order.id,
        status: order.status,
      };
    });
  return {
    orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (id) => dispatch(fetchUserOrders(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourRecentOrders);
