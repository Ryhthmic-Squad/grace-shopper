import React, { Component } from 'react';
import { connect } from 'react-redux';
//testing fetchProductList, will remove later;
import { fetchProductList } from '../store/product/productList';
import Login from './Login';

class Main extends Component {
  render() {
    const { fetchProductList } = this.props;
    return (
      <div>
        <hr />
        <Login />
        {/* Next line also for testing fetchProductList thunk */}
        <button onClick={fetchProductList}>Fetch Products</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProductList: () => dispatch(fetchProductList()),
});

export default connect(null, mapDispatchToProps)(Main);
