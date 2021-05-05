import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingleProductCard } from '../components/styles/SingleProductCard';
import productInventory from '../store/product/productInventory';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('singleProduct mounted!');
  }

  render() {
    console.log('single prod props is', this.props);
    return (
      <div>
        <h3> Product Name </h3>
        <h5> Product Description............ </h5>
        <img display="block" width="250rem" src={product.imageURL} />
        <h4> $100 </h4>

        <h6> Add to Cart </h6>
        <button onClick={() => (product.cartId = user.cartId)}> + </button>
        <button onClick={() => (product.cartId = null)}> - </button>
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
const mapStateToProps = ({ productList }) => ({
  productList,
});
const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProductList()),
});

// const mapStateToProps = (state, otherProps) => {
//   const product = state.productList.find(
//     (product) => product.id === props.match.params.id * 1
//   );
//   return {
//     product: product,
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

//add in 'added to cart! message
