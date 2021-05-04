import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderList } from '../../store/order/orderList';
import { Row } from '../../components/styles/AdminConsole';

class AllOrders extends Component {
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
        <h2>Recent Orders</h2>
        <Row>
          <strong>Id</strong>
          <strong>Status</strong>
          <strong>Order Date</strong>
        </Row>
        <hr />
        <ul>
          {orders.length ? (
            orders.map((order) => (
              <li key={order.id}>
                <span>{order.status}</span>
                <span>{order.date}</span>
              </li>
            ))
          ) : (
            <li>
              <Row>
                <span>{'none'}</span>
                <span>{'none'}</span>
                <span>{'none'}</span>
              </Row>
            </li>
          )}
        </ul>
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
    fetchOrders: () => dispatch(fetchOrderList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
