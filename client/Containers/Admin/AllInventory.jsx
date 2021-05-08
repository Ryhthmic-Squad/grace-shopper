import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductInventory } from '../../store/product/productInventory';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';

class AllInventory extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  async componentDidMount() {
    const { fetchProductInventory } = this.props;
    await fetchProductInventory();
    this.setState({ products: this.props.products });
  }
  render() {
    const { products } = this.state;
    return (
      <div>
        <h2>Inventory</h2>
        <hr className="heavy" />
        <Row>
          <strong>Id</strong>
          <strong>Item Name</strong>
          <strong>QTY</strong>
          <strong>Product Page</strong>
        </Row>
        <hr />
        <ul>
          {products.length ? (
            products.map((product) => (
              <Row key={product.id}>
                <span>{product.id}</span>
                <span>{product.name}</span>
                <span>{product.inventory}</span>
                <Button
                  onClick={() => {
                    window.location = `#/products/${product.id}`;
                  }}
                >
                  Go To Product Page
                </Button>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const products = state.productInventory.products;
  return {
    products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductInventory: () => dispatch(fetchProductInventory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
