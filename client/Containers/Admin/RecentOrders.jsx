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
    const { orders } = this.state;
    return (
      <div>
        <Router>
          <Route component={AllOrders} path="/AdminConsole/orders" />
        </Router>
        <h2>Recent Orders</h2>
        <hr className="heavy" />
        <Row>
          <strong>Name</strong>
          <strong>Order Date</strong>
        </Row>
        <hr />
        <Row>
          {orders.length ? (
            orders.map((order) => (
              <Row key={order.id}>
                <span>{order.name}</span>
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
        </Row>
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
  const orders = state.orderList.orders
    .sort(
      (user1, user2) =>
        new Date(user1.createdAt.slice(0, 10)) -
        new Date(user2.createdAt.slice(0, 10))
    )
    .map((order) => {
      const user = state.users.find((user) => order.userId === user.id);
      return {
        date: order.createdAt.slice(0, 10),
        id: order.id,
        name: `${user.fullName}`,
      };
    });
  if (orders.length > 3) orders.slice(2);
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
