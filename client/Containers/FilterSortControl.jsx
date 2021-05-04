import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { resetPagination } from '../store/product/productPagination';
import {
  setProductFilters,
  filterByType,
  filterByStyle,
  filterByRoom,
  clearFilters,
} from '../store/product/productFilters';
import Button from '../components/styles/Button';
import buildProductQuery from '../components/utils/buildProductQuery';
import { fetchProductList } from '../store/product/productList';

// const mapStateToProps = ({ productFilters }) => ({ productFilters });

// const mapDispatchToProps = (dispatch) => ({
//   filter: (option) => {
//     const { type, style, room, clear } = option;
//     if (typeof type === 'string') {
//       dispatch(filterByType(type));
//     }
//     if (typeof style === 'string') {
//       dispatch(filterByStyle(style));
//     }
//     if (typeof room === 'string') {
//       dispatch(filterByRoom(room));
//     }
//     if (clear) {
//       dispatch(clearFilters());
//     }
//     dispatch(resetPagination());
//   },
// });

const FilterSortBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: black;
  width: calc(100%);
  border-radius: 0 0 0.5rem 0.5rem;
  color: white;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const FilterLabel = styled.label`
  padding: 1em 0 1em 1em;
`;

const FilterSelect = styled.select`
  margin: 1em;
`;

const FilterSortControl = () => {
  const { productFilters, productPagination } = useSelector(
    ({ productFilters, productPagination }) => ({
      productFilters,
      productPagination,
    })
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const getProducts = (query) => dispatch(fetchProductList(query));
  const filter = (options) => {
    // options: { type?: string, style?: string, room?: string, clear?: true|false }
    for (const key in productFilters) {
      if (typeof options[key] === 'string') productFilters[key] = options[key];
    }
    if (options.clear) {
      for (const key in productFilters) {
        productFilters[key] = '';
      }
    }
    const query = buildProductQuery({
      productFilters,
      productPagination: { ...productPagination, page: 1 },
    });
    history.push(`/productsTest${query}`);
    getProducts(query);
  };
  return (
    <FilterSortBar>
      {[
        [
          'room',
          [
            ['bedroom', 'Bedroom'],
            ['living', 'Living'],
            ['dining', 'Dining'],
            ['bathroom', 'Bathroom'],
            ['', 'None'],
          ],
        ],
        [
          'style',
          [
            ['contemporary', 'Contemporary'],
            ['modern', 'Modern'],
            ['transitional', 'Transitional'],
            ['', 'None'],
          ],
        ],
        [
          'type',
          [
            ['bed', 'Beds'],
            ['dresser', 'Dressers'],
            ['nightstand', 'Nightstands'],
            ['', 'None'],
          ],
        ],
      ].map((val, idx) => {
        const [selectLabel, options] = val;
        return (
          <FilterContainer key={idx}>
            <FilterLabel>{selectLabel.toUpperCase()}</FilterLabel>
            <FilterSelect
              value={productFilters[selectLabel]}
              onChange={(ev) => filter({ [selectLabel]: ev.target.value })}
            >
              {options.map((option, idx) => {
                const [newOpt, label] = option;
                return (
                  <option key={idx} value={newOpt}>
                    {label}
                  </option>
                );
              })}
            </FilterSelect>
          </FilterContainer>
        );
      })}
      <Button onClick={() => filter({ clear: true })}>Clear All Filters</Button>
    </FilterSortBar>
  );
};

export default FilterSortControl;
