import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderList } from '../../store/order/orderList';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { HashRouter as Router, Route, Link, useParams } from 'react-router-dom';
import AllOrders from './AllOrders';
class RecentOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  async componentDidMount() {
    const { fetchOrders } = this.props;
    await fetchOrders();
    this.setState({ orders: this.props.orders });
  }
  render() {
    const { orders } = this.props;
    return (
      <div>
        <h2>Recent Orders</h2>
        <hr className="heavy" />
        <Row>
          <strong>Order Status</strong>
          <strong>Order Date</strong>
        </Row>
        <hr />
        <ul>
          {orders.length ? (
            orders.map((order) => (
              <Row key={order.id}>
                <span>{order.status}</span>
                <span>{order.date}</span>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </ul>
        <Button
          onClick={() => {
            window.location = '#/AdminConsole/orders';
          }}
        >
          Show All Orders
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let orders = state.orderList.orders.map((order) => {
    return {
      date: order.createdAt.slice(0, 10),
      status: order.status,
      id: order.id,
    };
  });
  if (orders.length > 3) orders = orders.slice(0, 2);
  return {
    orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrderList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentOrders);
