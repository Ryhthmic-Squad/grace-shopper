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
        </Row>
        <hr />
        <ul>
          {products.length ? (
            products.map((product) => (
              <li key={product.id}>
                <Row>
                  <span>{product.id}</span>
                  <span>{product.name}</span>
                  <span>{product.inventory}</span>
                </Row>
              </li>
            ))
          ) : (
            <li>
              <Row>
                <span>{'none'}</span>
                <span>{'none'}</span>
                <span>{'none'}</span>
              </Row>
            </li>
          )}
        </ul>
        <Button>Show Inventory</Button>
        <Button>Add Product</Button>
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
