import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductList } from '../store/product/productList';
import { setProductPagination } from '../store/product/productPagination';
import { setProductFilters } from '../store/product/productFilters';
import PaginationControl from './PaginationControl';
import FilterSortControl from './FilterSortControl';
import getProductQueries from '../components/utils/getProductQueries';
import buildProductQuery from '../components/utils/buildProductQuery';
import {
  ProductCard,
  ProductGrid,
  ProductInfo,
  ProductImg,
} from '../components/styles/ProductCard';
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

  render() {
    // console.log(props);
    const { productList } = this.props;
    return (
      <div className="allProducts">
        <h1>All Products Page</h1>
        <PaginationControl top></PaginationControl>
        <FilterSortControl></FilterSortControl>
        <div className="allProducts">
          <h1>All Furniture </h1>
          <ProductGrid>
            {this.props.productList.map((product) => {
              return (
                <ProductCard key={product.id}>
                  <ProductImg>
                    <img
                      display="block"
                      width="150rem"
                      src={product.imageUrl}
                    />
                  </ProductImg>
                  <hr />
                  <ProductInfo>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <h5> ${product.price}</h5>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductGrid>
        </div>
        <PaginationControl></PaginationControl>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
