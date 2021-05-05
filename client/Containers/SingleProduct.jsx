import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <h1>single product </h1>
      </div>

      // <ProductCard key={product.id}>
      //   <ProductImg>
      //     <img display="block" width="250rem" src={product.imageUrl} />
      //   </ProductImg>
      //   <hr />
      //   <ProductInfo>
      //     <Link to={`/products/${product.id}`}>{product.name}</Link>
      //     <h5> ${product.price}</h5>
      //   </ProductInfo>
      // </ProductCard>
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
