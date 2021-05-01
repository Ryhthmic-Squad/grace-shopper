import React, { Component } from 'react';

class allProducts extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log('mounted!');
  }
  render() {
    return (
      <div>
        <h1>All Products Page</h1>
      </div>
    );
  }
}

export default allProducts;
