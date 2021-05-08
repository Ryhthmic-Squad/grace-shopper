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
import { fetchProductTypes } from '../store/product/productTypes';

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
  background-color: #ffda08;
  color: black;
  padding: 0.5rem;
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
  const {
    productFilters,
    productPagination,
    productTypes,
    productStyles,
    productRooms,
  } = useSelector(
    ({
      productFilters,
      productPagination,
      productTypes,
      productStyles,
      productRooms,
    }) => ({
      productFilters,
      productPagination,
      productTypes,
      productStyles,
      productRooms,
    })
  );
  console.log(productRooms);
  const dispatch = useDispatch();
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
        <FilterLabel>sort</FilterLabel>
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
        <FilterLabel>size</FilterLabel>
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
              ...productRooms.map(({ name: room }) => [
                room,
                `${room[0].toUpperCase()}${room.slice(1)}`,
              ]),
              ['', 'None'],
            ],
          ],
          [
            'style',
            [
              ...productStyles.map(({ style }) => [
                style,
                `${style[0].toUpperCase()}${style.slice(1)}`,
              ]),
              ['', 'None'],
            ],
          ],
          [
            'type',
            [
              ...productTypes.map(({ type }) => [
                type,
                `${type[0].toUpperCase()}${type.slice(1)}`,
              ]),
              ['', 'None'],
            ],
          ],
        ].map((val, idx) => {
          let [selectLabel, options] = val;
          return (
            <FilterContainer key={idx}>
              <FilterLabel>{selectLabel}</FilterLabel>
              <FilterSelect
                value={productFilters[selectLabel]}
                onChange={(ev) => filter({ [selectLabel]: ev.target.value })}
              >
                {options.map((option, idx) => {
                  let [newOpt, label] = option;
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
