import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchProductList from '../store/product/productList';
import {
  ProductCard,
  ProductGrid,
  ProductInfo,
  ProductImg,
} from '../components/styles/ProductCard';

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('AllProducts component mounted!');
    console.log('props is', this.props);
  }
  render() {
    const { productList } = this.props;

    return (
      <div className="allProducts">
        <h1>All Furniture </h1>
        <ProductGrid>
          {this.props.productList.map((product) => {
            return (
              <ProductCard key={product.id}>
                <ProductImg>
                  <img display="block" width="150rem" src={product.imageUrl} />
                </ProductImg>
                <hr />
                <ProductInfo>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  <h5> ${product.price}</h5>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductGrid>
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
