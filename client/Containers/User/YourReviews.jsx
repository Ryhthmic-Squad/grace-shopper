import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Spacer } from '../../components/styles/AdminConsole';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import Button from '../../components/styles/Button';
import { fetchUserReviews } from '../../store/reviews/reviewUsers';
import axios from 'axios';
class YourReviews extends Component {
  constructor() {
    super();
    this.state = {
      auth: {},
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
    const { fetchReviews } = this.props;
    await fetchReviews(auth.id);

    this.setState({
      reviewHistory: this.props.reviews,
    });
  }

  render() {
    const { auth, reviewHistory } = this.state;
    return (
      <div>
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
  return {
    reviews,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviews: (id) => dispatch(fetchUserReviews(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourReviews);
