import React, { Component } from 'react';

class AllProducts extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log('AllProducts component mounted!');
  }
  render() {
    return (
      <div>
        <h1>All Products Page</h1>
      </div>
    );
  }
}

export default AllProducts;
