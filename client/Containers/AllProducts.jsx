import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchProductList from '../store/product/productList';

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('AllProducts component mounted!');
    console.log('props is', this.props);
    console.log('state is', this.state);
  }
  render() {
    // console.log(props);
    const productList = this.props;
    return (
      <div className="allProducts">
        <h1>All Products Page</h1>
        <ul>
          {/* {productList.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`api/products/${product.id}`}>{product.name}</Link>
                <img
                  className="image"
                  height="100"
                  width="100"
                  src={product.imageURL}
                ></img>
              </li>
            );
          })} */}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ productList }) => ({
  productList,
});
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProductList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
