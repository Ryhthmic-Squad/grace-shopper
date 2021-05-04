import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { resetPagination } from '../store/product/productPagination';
import {
  setProductFilters,
  filterByType,
  filterByStyle,
  filterByRoom,
  clearFilters,
} from '../store/product/productFilters';

const mapStateToProps = ({ productFilters }, ownProps) => ({
  productFilters,
  ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  filter: (option) => {
    const { type, style, room, clear } = option;
    if (typeof type === 'string') {
      dispatch(filterByType(type));
    }
    if (typeof style === 'string') {
      dispatch(filterByStyle(style));
    }
    if (typeof room === 'string') {
      dispatch(filterByRoom(room));
    }
    if (clear) {
      dispatch(clearFilters());
    }
    dispatch(resetPagination());
  },
});

const FilterSortBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: black;
  width: calc(100%);
  border-radius: 1em;
  color: white;
`;

const FilterContainer = styled.div`
  display: flex;
`;

const FilterLabel = styled.label`
  padding: 1em;
`;

const FilterSelect = styled.select`
  margin: 0.5em;
`;

class FilterSortControl extends Component {
  componentDidMount = () => {
    const { ownProps } = this.props;
    console.log(ownProps);
  };
  render = () => {
    const { productFilters, filter } = this.props;
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
      </FilterSortBar>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSortControl);
