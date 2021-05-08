import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderList } from '../../store/order/orderList';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { updateOrder } from '../../store/order/orderUpdate';
import { FormGroup } from '../../components/styles/Forms';
import FeaturedButton from '../../components/styles/FeaturedButton';
class EditOrder extends Component {
  constructor() {
    super();
    this.state = {
      order: { id: '', createdAt: '', status: '' },
    };
  }
  async componentDidMount() {
    const { fetchOrders } = this.props;
    await fetchOrders();
    const currOrder = this.props.order;
    this.setState({ ...this.state.order, ...currOrder });
  }
  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { updateOrd } = this.props;
    updateOrd({ ...this.props.order, ...this.state.order });
  }
  render() {
    const { onChange, onSubmit } = this;
    const { order } = this.state;
    return (
      <div>
        <h2>Recent Orders</h2>
        <hr className="heavy" />
        <Row>
          <strong>Id</strong>
          <strong>Order Date</strong>
          <strong>Order Status</strong>
        </Row>
        <hr />
        <Row key={order.id}>
          <span>{order.id}</span>
          <span>{order.createdAt.slice(0, 10)}</span>
          <FormGroup onSubmit={onSubmit}>
            <label for="order">Change Status</label>
            <select id="order" name="status" onChange={onChange}>
              <option value="CREATED">CREATED</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <FeaturedButton>Submit</FeaturedButton>
          </FormGroup>
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

const mapStateToProps = (state, OwnProps) => {
  const order = state.orderList.orders.filter((order) => {
    order === OwnProps.match.params.id;
  });

  return {
    order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrderList()),
    updateOrd: (order) => dispatch(updateOrder(order)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
