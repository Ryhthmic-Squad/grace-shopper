import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductInventory } from '../../store/product/productInventory';
import { Row } from '../../components/styles/AdminConsole';
import Button from '../../components/styles/Button';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AddProduct from './AddProduct';
import EditUser from './EditUser';

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
      <Router>
        <Route component={AddProduct} path="AdminConsole/addproduct" />
        <Route component={EditUser} path="AdminConsole/inventory" />
        <div>
          <h2>Inventory</h2>
          <hr className="heavy" />
          <Row>
            <strong>Id</strong>
            <strong>Low-stock Item Name</strong>
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
          <Link to={'/AdminConsole/inventory'}>Show All Inventory</Link>
          <Button>Add Product</Button>
          <Link to={'/AdminConsole/addproduct'}>Add Product</Link>
        </div>
      </Router>
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
