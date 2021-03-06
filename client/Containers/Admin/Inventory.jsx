import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductInventory } from '../../store/product/productInventory';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class Inventory extends Component {
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
          <strong>Low-stock Item Name</strong>
          <strong>QTY</strong>
        </Row>
        <hr />
        <Row>
          {products.length ? (
            products.map((product) => (
              <Row key={product.id}>
                <span>{product.id}</span>
                <span>{product.name}</span>
                <span>{product.inventory}</span>
              </Row>
            ))
          ) : (
            <Row>
              <span>{'none'}</span>
              <span>{'none'}</span>
              <span>{'none'}</span>
            </Row>
          )}
        </Row>
        <Button
          onClick={() => {
            window.location = '#/AdminConsole/inventory';
          }}
        >
          Show Inventory
        </Button>
        <Button
          onClick={() => {
            window.location = '#/AdminConsole/addproduct';
          }}
        >
          Add Product
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const products = state.productInventory.products.filter((product) => {
    return product.inventory <= 5;
  });
  if (products.length > 3) products.slice(2);
  return {
    products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductInventory: () => dispatch(fetchProductInventory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
