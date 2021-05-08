import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SingleProductPage,
  ProductCard,
  Hero,
} from '../components/styles/SingleProductPage';
import Button from '../components/styles/FeaturedButton';
import { fetchProductDetail } from '../store/product/productDetail';
import { updateCartProduct } from '../store/cart/cart';

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
    const { productDetail, updateCartProduct } = this.props;
    return (
      <div>
        <SingleProductPage>
          <Hero>
            {' '}
            <img width="100%" src={productDetail.imageUrl} />
          </Hero>
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
                onClick={() => {
                  updateCartProduct({
                    productId: productDetail.id,
                    quantity: 1,
                  });
                }}
              >
                Add to Cart
              </Button>
            ) : (
              'Out of stock'
            )}
          </ProductCard>
        </SingleProductPage>
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
    updateCartProduct: ({ productId, quantity }) =>
      dispatch(updateCartProduct({ productId, quantity })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
