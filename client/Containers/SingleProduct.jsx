import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SingleProductPage,
  ProductCard,
  HeroImg,
  Line,
  Table,
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
          <HeroImg src={productDetail.imageUrl} />
          <ProductCard>
            <h2> {productDetail.name} </h2>
            <Line />
            <h3> $ {productDetail.price} </h3>
            <p> {productDetail.description} </p>
            <Table>
              <tbody>
                <tr>
                  <td>
                    <strong>Dimensions&nbsp;&nbsp;</strong>
                  </td>
                  <td>
                    {productDetail.height}" H {productDetail.width}" W
                    {productDetail.depth}" D
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Color</strong>
                  </td>
                  <td>{productDetail.color}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Material</strong>
                  </td>
                  <td>{productDetail.material}</td>
                </tr>
              </tbody>
            </Table>
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
