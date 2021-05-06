import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SingleProductPage,
  ProductCard,
} from '../components/styles/SingleProductPage';
import Button from '../components/styles/Button';
import productInventory from '../store/product/productInventory';
import productDetail, {
  fetchProductDetail,
} from '../store/product/productDetail';
import states from '../../server/db/states';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('singleProduct mounted!');
    const { getProductDetail } = this.props;
    getProductDetail();
    console.log(this.props);
  }
  componentDidUpdate() {}

  render() {
    const { productDetail } = this.props;
    return (
      <div>
        <SingleProductPage>
          <ProductCard>
            {' '}
            <img display="block" width="300rem" src={productDetail.imageUrl} />
          </ProductCard>
          <ProductCard>
            {' '}
            <h2> {productDetail.name} </h2>
            <h4> $ {productDetail.price} </h4>
            <h5> {productDetail.description} </h5>
            <h6>
              {' '}
              Dimensions: {productDetail.height}" H {productDetail.width}" W $
              {productDetail.depth}" D
            </h6>
            <h6> Color: {productDetail.color} </h6>
            <h6> Material: {productDetail.material} </h6>
            {productDetail.availability ? (
              <Button
              // onClick={() => {
              //   productDetail.added = true;
              // }}
              >
                Add to Cart
              </Button>
            ) : (
              'Out of stock'
            )}
            {/* {productDetail.added ? (
          <h4>`${productDetail.name} added to cart!`</h4>
        ) : null} */}
          </ProductCard>
        </SingleProductPage>
        <h2> Reviews </h2>
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const { productDetail } = state;
  // const product = state.productList.find(
  //   (product) => product.id === props.match.params.id * 1
  // );
  return {
    productDetail,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return {
    getProductDetail: () => dispatch(fetchProductDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
