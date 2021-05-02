import React, { Component } from 'react';
import { connect } from 'react';
import { fetchOrderList } from '.../store/order/orderList';

class RecentOrders extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      orders: [],
    };
  }
  async componentDidMount() {
    const { fetchOrders, orders } = this.props;
    await fetchOrders();
    this.state.orders = orders;
    this.state.loading = false;
  }
  render() {
    const { loading, orders } = this.state;
    return loading ? (
      <h1>Loading</h1>
    ) : (
      <div>
        <h2>Recent Orders</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Order Status</th>
              </tr>
            </thead>
            {orders.length ? (
              orders.map((order) => (
                <tbody>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.status}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div>
          <Link to={`id/AdminConsole/all/orders`}>Show All Orders</Link>
        </div>
      </div>
    );
  }
}
//create order component for store
const mapStateToProps = (state) => {
  const orders = state.orders
    .sort((a, b) => b.createdAt.substring(0, 10) - a.createdAt.substring(0, 10))
    .map((order) => {
      const user = state.users.find((user) => order.userId === user.id);
      return {
        status: order.status,
        id: order.id,
        name: `${user.fullName}`,
      };
    })
    .slice(2);
  return {
    orders,
  };
};
//create and impor thunks for orders
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrderList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentOrders);
