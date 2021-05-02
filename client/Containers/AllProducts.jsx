import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('AllProducts component mounted!');
  }
  render() {
    const { fetchProductList } = this.props;
    return (
      <div>
        <h1>All Products Page</h1>
        {/* <ul>
          {this.props.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`api/products/${product.id}`}>{product.name}</Link>
                <img
                  className="image"
                  height="100"
                  width="100"
                  src={product.imageURL}
                ></img>
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}

export default AllProducts;
