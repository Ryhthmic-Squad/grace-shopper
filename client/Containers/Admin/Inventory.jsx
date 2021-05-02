import React, { Component } from 'react';
import { connect } from 'react';
import { fetchProductInventory } from '.../store/product/productInventory';

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      products: [],
    };
  }
  async componentDidMount() {
    const { fetchOrders, products } = this.props;
    await fetchOrders();
    this.state.products = products;
    this.state.loading = false;
  }
  render() {
    const { loading, products } = this.state;
    return loading ? (
      <h1>Loading</h1>
    ) : (
      <div>
        <h2>Inventory</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Low-stock Item Name</th>
                <th>QTY</th>
              </tr>
            </thead>
            {products.length ? (
              product.map((product) => (
                <tbody>
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.inventory}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                  <td>{'none'}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div>
          <Link to={`id/AdminConsole/all/inventory`}>Show Inventory</Link>
        </div>
        <div>
          <Link to={`id/AdminConsole/add/product`}>Add Product</Link>
        </div>
      </div>
    );
  }
}

//need product thunks that has inventory
const mapStateToProps = (state) => {
  let products;
  try {
    products = state.productInventory.products
      .filter((product) => product.inventory <= 5)
      .slice(2);
  } catch {
    products = [];
  } finally {
    return products;
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductInventory: () => dispatch(fetchProductInventory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
