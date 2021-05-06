import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingleProductCard } from '../components/styles/SingleProductCard';
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
      // <div>
      //   {' '}
      //   single product rendered
      //   <h1>{productDetail.name}</h1>
      // </div>

      <div>
        <h2> {productDetail.name} </h2>
        <h5> {productDetail.description} </h5>
        <img display="block" width="250rem" src={productDetail.imageUrl} />
        <h4> $ {productDetail.price} </h4>
        <h6> Add to Cart </h6>
        {productDetail.availability ? (
          <button> Add to Cart </button>
        ) : (
          'Out of stock '
        )}

        <hr />
        <div>Reviews below</div>
      </div>

      // onClick = ()=> {
      //   product.cartId = user.cartId
      // }
      /* image 2 */
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const { productDetail } = state;
//   const {
//     history,
//     match: {
//       params: { id },
//     },
//   } = ownProps;
//   return { productDetail, id, history };
// };

// const mapStateToProps = (state, otherProps) => {
//   const product = state.productList.find((product) => {
//     product.id === props.match.params.id * 1;
//   });
//   return product;
// };
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

// //add in 'added to cart! message
