import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Spacer } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { fetchUserOrders } from '../../store/order/orderUser';
import { fetchUserReviews } from '../../store/reviews/reviewUsers';

class UserConsole extends Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      orderHistory: [],
      reviewHistory: [],
    };
  }
  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const { data: auth } = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      this.setState({ auth });
    }
    const { auth } = this.state;
    const { fetchOrders, fetchReviews } = this.props;
    await Promise.all([fetchOrders(auth.id), fetchReviews(auth.id)]);

    this.setState({
      orderHistory: this.props.orders,
      reviewHistory: this.props.reviews,
    });
  }

  render() {
    const { auth, orderHistory, reviewHistory } = this.state;
    return (
      <div>
        <Button
          onClick={() => {
            window.location = '#/user/profile';
          }}
        >
          Edit Your Profile
        </Button>
        <hr className="heavy" />
        <h2>Order History</h2>
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
                <Button
                  onClick={() => {
                    window.location = `#/user/orders/${order.id}`;
                  }}
                >
                  Show Order Details
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
            window.location = '#/user/orders';
          }}
        >
          Show All Orders
        </Button>
        <Spacer m={4} />
        <h2>Reviews</h2>
        <Row>
          <strong>Review</strong>
          <strong>Rating</strong>
          <strong>Date</strong>
        </Row>
        <Row>
          {reviewHistory.length ? (
            reviewHistory.map((review) => (
              <Row key={review.id}>
                <span>{review.text}</span>
                <span>{review.rating}</span>
                <span>{review.createdAt.slice(0, 10)}</span>
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
            window.location = '#/user/reviews';
          }}
        >
          Show All Reviews
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const reviews = state.reviewUsers.reviews.sort(
    (review1, review2) =>
      new Date(review1.createdAt.slice(0, 10)) -
      new Date(review2.createdAt.slice(0, 10))
  );
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
  if (orders.length > 3) orders.slice(2);
  return {
    reviews,
    orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (id) => dispatch(fetchUserOrders(id)),
    fetchReviews: (id) => dispatch(fetchUserReviews(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserConsole);
