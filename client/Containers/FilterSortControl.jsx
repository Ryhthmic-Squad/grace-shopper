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
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: black;
  width: calc(100% - 0.5rem);
  border-radius: 0 0 0.5rem 0.5rem;
  color: white;
  padding: 0 0.5rem 0.5rem 0;
`;

const AllFilterContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const FilterLabel = styled.label`
  padding: 0.5rem 0 0.5rem 0.5rem;
`;

const FilterSelect = styled.select`
  margin: 0.5rem;
`;

const FilterSortControl = () => {
  const { productFilters, productPagination } = useSelector(
    ({ productFilters, productPagination }) => ({
      productFilters,
      productPagination,
    })
  );
  const history = useHistory();
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
    history.push(`/products${query}`);
  };
  const paginate = (options) => {
    // options: { page?: INT, size?: INT, sort?: STRING }
    for (const key in productPagination) {
      if (options[key]) productPagination[key] = options[key];
    }
    const query = buildProductQuery({ productFilters, productPagination });
    history.push(`/products${query}`);
  };
  return (
    <FilterSortBar>
      <FilterContainer>
        <FilterLabel>SORT</FilterLabel>
        <FilterSelect
          value={productPagination.sort}
          onChange={(ev) => paginate({ page: 1, sort: ev.target.value })}
        >
          <option value={'name,ASC'}>Name, A-Z</option>
          <option value={'name,DESC'}>Name, Z-A</option>
          <option value={'price,DESC'}>Price, High to Low</option>
          <option value={'price,ASC'}>Price, Low to High</option>
        </FilterSelect>
      </FilterContainer>
      <FilterContainer>
        <FilterLabel>SIZE</FilterLabel>
        <FilterSelect
          value={productPagination.size}
          onChange={(ev) => paginate({ page: 1, size: ev.target.value * 1 })}
        >
          <option value="6">6 per Page</option>
          <option value="12">12 per Page</option>
          <option value="18">18 per Page</option>
          <option value="24">24 per Page</option>
        </FilterSelect>
      </FilterContainer>
      <AllFilterContainer>
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
      </AllFilterContainer>
      <Button onClick={() => filter({ clear: true })}>Clear All Filters</Button>
    </FilterSortBar>
  );
};

export default FilterSortControl;
