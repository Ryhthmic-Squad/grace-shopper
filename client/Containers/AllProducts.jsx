import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductList } from '../store/product/productList';
import PaginationControl from './PaginationControl';
import FilterSortControl from './FilterSortControl';
import { setProductPagination } from '../store/product/productPagination';
import { setProductFilters } from '../store/product/productFilters';

const mapStateToProps = ({
  productList,
  productPagination,
  productFilters,
}) => ({
  productList,
  productPagination,
  productFilters,
});
const mapDispatchToProps = (dispatch, { history }) => ({
  getProducts: () => dispatch(fetchProductList(history)),
  setPagination: (productPagination) =>
    dispatch(setProductPagination(productPagination)),
  setFilters: (productFilters) => dispatch(setProductFilters(productFilters)),
});

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log('AllProducts component mounted!');
    // console.log('props is', this.props);
    // console.log('state is', this.state);
    const {
      productPagination,
      setPagination,
      productFilters,
      setFilters,
      getProducts,
      location: { search },
    } = this.props;
    const query = search
      .slice(1)
      .split('&')
      .reduce((acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
      }, {});
    for (const key in productFilters) {
      if (query[key]) productFilters[key] = query[key];
    }
    setFilters(productFilters);
    for (const key in productPagination) {
      if (query[key]) {
        productPagination[key] = key === 'sort' ? query[key] : query[key] * 1;
      }
    }
    setPagination(productPagination);
    getProducts();
  }

  componentDidUpdate = (prevProps) => {
    // First, destructure the previous version of productPagination and
    // productFilters from the prevProps object, naming them prevPagination
    // and prevFilters, respectively. Also destructure the previous version
    // of search from location.
    const {
      productPagination: prevPagination,
      productFilters: prevFilters,
      location: { search: prevSearch },
    } = prevProps;
    // Then, destructure the current versions of productPagination and
    // productFilters from the current props object. Also, grab the
    // getProducts method and current version of search.
    const {
      productPagination,
      setPagination,
      productFilters,
      setFilters,
      getProducts,
      location: { search },
    } = this.props;
    // Use a needProductRefresh boolean to determin later if we need to
    // refetch the productList
    let needProductRefresh = false;
    // if (prevSearch !== search) {
    //   // If prevSearch does not equal current search, then someone changed the
    //   // URL, either by using the back button or typing it in. Either way, we
    //   // want to refresh the product list.
    //   needProductRefresh = true;
    // }
    if (prevSearch !== search) {
      const query = search
        .slice(1)
        .split('&')
        .reduce((acc, param) => {
          const [key, value] = param.split('=');
          acc[key] = value;
          return acc;
        }, {});
      for (const key in productFilters) {
        if (query[key]) productFilters[key] = query[key];
      }
      setFilters(productFilters);
      for (const key in productPagination) {
        if (query[key]) {
          productPagination[key] = key === 'sort' ? query[key] : query[key] * 1;
        }
      }
      setPagination(productPagination);
    }
    for (const key in prevPagination) {
      // Loop over the properties (maxPage, page, size, sort) of the
      // prevPagination object
      if (prevPagination[key] !== productPagination[key]) {
        // If any fail to match between the prevProps and current props
        // version, set needProductRefresh to true and break from the loop.
        needProductRefresh = true;
        break;
      }
    }
    for (const key in prevFilters) {
      // Loop over the properties (type, style, room) of the prevFilters object
      if (prevFilters[key] !== productFilters[key]) {
        // If any fail to match between the prevProps and current props
        // version, set needProductRefresh to true and break from the loop.
        needProductRefresh = true;
        break;
      }
    }
    if (needProductRefresh) {
      // If needProductRefresh is true, it means the current pagination or
      // filter props do not match the previous versions, so we need to
      // refetch all relevant products
      getProducts();
    }
  };

  render() {
    // console.log(props);
    const { productList } = this.props;
    return (
      <div className="allProducts">
        <h1>All Products Page</h1>
        <PaginationControl></PaginationControl>
        <FilterSortControl></FilterSortControl>
        <ul>
          {productList.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`products/${product.id}`}>{product.name}</Link>
                <img
                  className="image"
                  height="100"
                  width="100"
                  src={product.imageURL}
                ></img>
              </li>
            );
          })}
        </ul>
        <PaginationControl></PaginationControl>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
