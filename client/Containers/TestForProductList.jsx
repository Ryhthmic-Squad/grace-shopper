import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductList } from '../store/product/productList';
import { setProductFilters } from '../store/product/productFilters';
import { setProductPagination } from '../store/product/productPagination';
import PaginationControl from './PaginationControl';
import FilterSortControl from './FilterSortControl';
import getProductQueries from '../components/utils/getProductQueries';
import buildProductQuery from '../components/utils/buildProductQuery';

// This page needs productList, productPagination and
// productFilters from the store
const mapStateToProps = (
  { productList, productPagination, productFilters },
  { location }
) => ({
  productList,
  productPagination,
  productFilters,
  location,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (query) => dispatch(fetchProductList(query)),
  setPagination: (productPagination) =>
    dispatch(setProductPagination(productPagination)),
  setFilters: (productFilters) => dispatch(setProductFilters(productFilters)),
});

class TestProductList extends Component {
  componentDidMount = () => {
    const {
      productPagination,
      setPagination,
      productFilters,
      setFilters,
      getProducts,
      location: { search },
    } = this.props;
    const { page, size, sort, type, style, room } = getProductQueries(search);
    const newPagination = {
      ...productPagination,
      page: page ? page * 1 : 1,
      size: size ? size * 1 : 6,
      sort: sort ? sort : 'name,ASC',
    };
    setPagination(newPagination);
    const newFilters = {
      ...productFilters,
      type: type ? type : '',
      style: style ? style : '',
      room: room ? room : '',
    };
    setFilters(newFilters);
    const query = buildProductQuery({
      productFilters: newFilters,
      productPagination: newPagination,
    });
    getProducts(query);
  };
  componentDidUpdate = (prevProps) => {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      productFilters,
      setFilters,
      productPagination,
      setPagination,
      getProducts,
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      const { page, size, sort, type, style, room } = getProductQueries(search);
      const newPagination = {
        ...productPagination,
        page: page ? page * 1 : 1,
        size: size ? size * 1 : 6,
        sort: sort ? sort : 'name,ASC',
      };
      setPagination(newPagination);
      const newFilters = {
        ...productFilters,
        type: type ? type : '',
        style: style ? style : '',
        room: room ? room : '',
      };
      setFilters(newFilters);
      const query = buildProductQuery({
        productFilters: newFilters,
        productPagination: newPagination,
      });
      getProducts(query);
    }
  };

  render = () => {
    const { productList } = this.props;
    return (
      <>
        <h2>Pagination &amp; Filter Test</h2>
        <PaginationControl top></PaginationControl>
        <FilterSortControl></FilterSortControl>
        <ul>
          {productList.map(({ id, name, price }) => {
            return (
              <li key={id}>
                {name}, ${price}
              </li>
            );
          })}
        </ul>
        <PaginationControl></PaginationControl>
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestProductList);
