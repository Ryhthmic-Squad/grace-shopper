import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderList } from '../../store/order/orderList';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
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
    console.log(this.state, this.props.orders);
  }
  render() {
    const { orders } = this.state;
    console.log(orders);
    return (
      <div>
        <h2>All Orders</h2>
        <Row>
          <strong>Id</strong>
          <strong>Status</strong>
          <strong>Order Date</strong>
        </Row>
        <hr />
        <ul>
          {orders.length ? (
            orders.map((order) => (
              <Row key={order.id}>
                <span>{order.status}</span>
                <span>{order.date}</span>
                <Button
                  onClick={() => {
                    window.location = `#/AdminConsole/orders/${order.id}`;
                  }}
                >
                  View Order Details
                </Button>
                <Button
                  onClick={() => {
                    window.location = `#/AdminConsole/orders/edit/${order.id}`;
                  }}
                >
                  Edit Order
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
