import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchProductList } from '../store/product/productList';
import {
  setProductPagination,
  nextPage,
  prevPage,
  goToPage,
  sizePage,
  sortPage,
  resetPagination,
} from '../store/product/productPagination';
import {
  setProductFilters,
  filterByType,
  filterByStyle,
  filterByRoom,
  clearFilters,
} from '../store/product/productFilters';

// This page needs productList, productPagination and productFilters from the store
const mapStateToProps = ({
  productList,
  productPagination,
  productFilters,
}) => ({
  productList,
  productPagination,
  productFilters,
});

const mapDispatchToProps = (dispatch) => ({
  // The getProducts() method dispatches the fetchProductList() thunk, which will update the productList in store based on current pagination and filters.
  getProducts: () => dispatch(fetchProductList()),
  // The setPagination() method dispatches the setProductPagination() action creator, allowing us to set all productPagination attributes (maxPage, page, size, and sort) at once.
  setPagination: (productPagination) =>
    dispatch(setProductPagination(productPagination)),
  // The paginationFuncs object contains various methods for manipulating the pagination, described individually below.
  paginationFuncs: {
    // nextPage() dispatches the nextPage() action creator, which increments the page by one. This should only be available to the user when the current page is less than the maxPage.
    nextPage: () => dispatch(nextPage()),
    // prevPage() dispatches the prevPage() action creator, which decrements the page by one. This should only be available to the user when the current page is greater than 1.
    prevPage: () => dispatch(prevPage()),
    // goToPage() dispatches the goToPage() action creator, which sets the current page to a specific value. The `page` parameter should only be an integer. This should only be able to reach actual pages, between 1 and maxPage, inclusive.
    goToPage: (page) => dispatch(goToPage(page)),
    // sizePage() dispatches the sizePage() action creator, which changes how many results appear on the page (default 6). The `size` parameter should be an integer between 1 and the maxPage, inclusive, unless you want all products, then passing in an empty string will get all products in the database.
    sizePage: (size) => dispatch(sizePage(size)),
    // sortPage() dispatches the sortPage() action creator, which changes how results are ordered. The `sort` parameter should be a string with the sequelize attribute you want to sort by and either DESC (for descending sort) or ASC (for ascending sort) separated by a comma (e.g. 'name,DESC')
    sortPage: (sort) => dispatch(sortPage(sort)),
  },
  // The setFilters() method dispatches the setProductFilters() action creator, allowing us to set all productFilter attributes (type, style, and room) at once.
  setFilters: (productFilters) => dispatch(setProductFilters(productFilters)),
  // The filter() method dispatches various filter action creators, depending on your specifications.
  filter: (option) => {
    // The `options` parameter should be an object with optional `type`, `style`, `room`, and `clear` properties.
    const { type, style, room, clear } = option;
    // `type`, `style`, and `room` should each be a string, if given, corresponding to the filter you want to apply; an empty string will clear that filter.
    if (typeof type === 'string') {
      dispatch(filterByType(type));
    }
    if (typeof style === 'string') {
      dispatch(filterByStyle(style));
    }
    if (typeof room === 'string') {
      dispatch(filterByRoom(room));
    }
    // And if you want to clear every filter, passing in `clear: true` will remove all filters.
    if (clear) {
      dispatch(clearFilters());
    }
    // Once the filter() method dispatches all relevant filter action creators, it resets the pagination on the page.
    dispatch(resetPagination());
  },
});

// used some styled components just to get the display for this test page appearing nicely
const TestArea = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TestChild = styled.div`
  width: calc(100% / 3);
  padding: 1em;
`;
const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

class TestProductList extends Component {
  componentDidMount = () => {
    // On first render, use the getProducts method to retrieve all products
    const { getProducts } = this.props;
    getProducts();
  };

  // Every render, we need to check if the pagination or filter properties have changed, to see if we need to refetch products
  componentDidUpdate = (prevProps) => {
    // First, destructure the previous version of productPagination and productFilters from the prevProps object, naming them prevPagination and prevFilters, respectively
    const {
      productPagination: prevPagination,
      productFilters: prevFilters,
    } = prevProps;
    // Then, destructure the current versions of productPagination and productFilters from the current props object. Also, grab the getProducts method.
    const { productPagination, productFilters, getProducts } = this.props;
    // Use a needProductRefresh boolean to determin later if we need to refetch the productList
    let needProductRefresh = false;
    for (const key in prevPagination) {
      // Loop over the properties (maxPage, page, size, sort) of the prevPagination object
      if (prevPagination[key] !== productPagination[key]) {
        // If any fail to match between the prevProps and current props version, set needProductRefresh to true and break from the loop.
        needProductRefresh = true;
        break;
      }
    }
    for (const key in prevFilters) {
      // Loop over the properties (type, style, room) of the prevFilters object
      if (prevFilters[key] !== productFilters[key]) {
        // If any fail to match between the prevProps and current props version, set needProductRefresh to true and break from the loop.
        needProductRefresh = true;
        break;
      }
    }
    if (needProductRefresh) {
      // If needProductRefresh is true, it means the current pagination or filter props do not match the previous versions, so we need to refetch all relevant products
      getProducts();
    }
  };

  render = () => {
    // Destructure various properties and methods from props, provided by our mapStateToProps and mapDispatchToProps connections
    const {
      // grab the productList from props to list the current products
      productList,
      // grab maxPage, sort, and page for pagination mechanics
      productPagination: { maxPage, sort, page },
      // grab the various pagination funcs we need to manipulate pagination
      paginationFuncs: { nextPage, prevPage, goToPage, sizePage, sortPage },
      // grab the dynamic filter method as well
      filter,
    } = this.props;
    // Because of how we store `sort` for the backend route, we need to split it and destructure `by` and `dir` properties to have dynamic sorting. For example, this will allow us to preserve the sort by price when we change the direction from ascending to descending.
    const [by, dir] = sort.split(',');
    return (
      <>
        <h2>Pagination &amp; Filter Test</h2>
        <TestArea>
          <TestChild>
            <h3>Filter Tests</h3>
            <div>
              <p>Type Tests</p>
              <ButtonRow>
                {/* These buttons apply a single filter by calling filter() with an options object that specifies the type to filter by */}
                <button onClick={() => filter({ type: 'bed' })}>Beds</button>
                <button onClick={() => filter({ type: 'dresser' })}>
                  Dressers
                </button>
                <button onClick={() => filter({ type: 'nightstand' })}>
                  Nightstands
                </button>
                {/* This button resets the type filter by calling filter() with an options object that sets the type to empty string */}
                <button onClick={() => filter({ type: '' })}>Clear</button>
              </ButtonRow>
            </div>
            <div>
              <p>Style Tests</p>
              <ButtonRow>
                {/* These buttons apply a single filter by calling filter() with an options object that specifies the style to filter by */}
                <button onClick={() => filter({ style: 'contemporary' })}>
                  Contemporary
                </button>
                <button onClick={() => filter({ style: 'modern' })}>
                  Modern
                </button>
                <button onClick={() => filter({ style: 'transitional' })}>
                  Transitional
                </button>
                {/* This button resets the style filter by calling filter() with an options object that sets the style to empty string */}
                <button onClick={() => filter({ style: '' })}>Clear</button>
              </ButtonRow>
            </div>
            <div>
              <p>Room Tests</p>
              <ButtonRow>
                {/* These buttons apply a single filter by calling filter() with an options object that specifies the room to filter by */}
                <button onClick={() => filter({ room: 'bedroom' })}>
                  Bedroom
                </button>
                <button onClick={() => filter({ room: 'living' })}>
                  Living
                </button>
                <button onClick={() => filter({ room: 'dining' })}>
                  Dining
                </button>
                <button onClick={() => filter({ room: 'bathroom' })}>
                  Bathroom
                </button>
                {/* This button resets the room filter by calling filter() with an options object that sets the room to empty string */}
                <button onClick={() => filter({ room: '' })}>Clear</button>
              </ButtonRow>
            </div>
            <div>
              <p>Combo Filter Tests</p>
              <ButtonRow>
                Modern:{' '}
                {/* These buttons apply multiple filters at once by calling filter() with an options object that specifies both the type and style to filter by */}
                <button
                  onClick={() => filter({ type: 'bed', style: 'modern' })}
                >
                  Beds
                </button>
                <button
                  onClick={() => filter({ type: 'dresser', style: 'modern' })}
                >
                  Dressers
                </button>
                <button
                  onClick={() =>
                    filter({ type: 'nightstand', style: 'modern' })
                  }
                >
                  Nightstands
                </button>
              </ButtonRow>
            </div>
            <div>
              <p>Clear Test</p>
              {/* This button clears all filters by calling the filter() method with clear set to true */}
              <button onClick={() => filter({ clear: true })}>
                Clear All Filters
              </button>
            </div>
          </TestChild>
          <TestChild>
            <h3>Pagination Tests</h3>
            <div>
              <p>Page Tests</p>
              <ButtonRow>
                {/* The PrevPage button only displays if the current page is greater than one, and the NextPage button only display if it's less than the maxPage. For styling we may want to instead display these at all times but give them an 'inoperable' class so they appear but clearly are not operable by the user. */}
                {page > 1 ? (
                  <button onClick={prevPage}>PrevPage</button>
                ) : (
                  <div>PrevPage</div>
                )}
                {page < maxPage ? (
                  <button onClick={nextPage}>NextPage</button>
                ) : (
                  <div>NextPage</div>
                )}
              </ButtonRow>
              <br />
              {/* This creates buttons for every possible page and links them to the goToPage() method */}
              <ButtonRow>
                {Array(maxPage)
                  .fill('')
                  .map((val, idx) => {
                    return (
                      <button key={idx} onClick={() => goToPage(idx + 1)}>
                        {idx + 1}
                      </button>
                    );
                  })}
              </ButtonRow>
            </div>
            <div>
              <p>Size Tests</p>
              {/* This creates 4 buttons for different possible page sizes and links them to the sizePage() method */}
              <ButtonRow>
                {Array(4)
                  .fill('')
                  .map((val, idx) => {
                    const size = (idx + 1) * 6;
                    return (
                      <button key={idx} onClick={() => sizePage(size)}>
                        {size}
                      </button>
                    );
                  })}
              </ButtonRow>
            </div>
            <div>
              <p>Sort Tests</p>
              {/* These first two buttons sort invoke the sortPage() method to sort by Name A->Z and Price $$ -> $, respectively, showing how you can prescribe the initial sort of a given option */}
              <ButtonRow>
                <button onClick={() => sortPage(`name,ASC`)}>Name</button>
                <button onClick={() => sortPage(`price,DESC`)}>Price</button>
              </ButtonRow>
              <br />
              <ButtonRow>
                {/* These buttons simply change the direction of the current sort, using the `by` variable we destructured from `sort` above and a template literal to change the direction */}
                <button onClick={() => sortPage(`${by},DESC`)}>
                  Descending
                </button>
                <button onClick={() => sortPage(`${by},ASC`)}>Ascending</button>
              </ButtonRow>
            </div>
          </TestChild>
          <TestChild>
            <ul>
              {/* Lists all the products currently in the store with their name and price we can see the pagination, sorting, filtering and sizing in action */}
              {productList.map(({ id, name, price }) => {
                return (
                  <li key={id}>
                    {name}, ${price}
                  </li>
                );
              })}
            </ul>
          </TestChild>
        </TestArea>
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestProductList);
