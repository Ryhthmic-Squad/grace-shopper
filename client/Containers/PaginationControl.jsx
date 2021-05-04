import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  setProductPagination,
  nextPage,
  prevPage,
  goToPage,
  sizePage,
  sortPage,
} from '../store/product/productPagination';

const mapStateToProps = ({ productPagination }) => ({ productPagination });

const mapDispatchToProps = (dispatch) => ({
  setPagination: (productPagination) =>
    dispatch(setProductPagination(productPagination)),
  paginationFuncs: {
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage()),
    goToPage: (page) => dispatch(goToPage(page)),
    sizePage: (size) => {
      dispatch(sizePage(size));
      dispatch(goToPage(1));
    },
    sortPage: (sort) => dispatch(sortPage(sort)),
  },
});

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: black;
  width: calc(100%);
  border-radius: 1em;
`;

const PageOptionContainer = styled.div`
  display: flex;
`;

const PageOption = styled.div`
  padding: 1em;
  color: ${(props) => (props.operable ? 'white' : 'gray')};
  cursor: ${(props) => (props.operable ? 'pointer' : 'default')};
`;

class PaginationControl extends Component {
  render = () => {
    const {
      productPagination: { maxPage, page, size, sort },
      paginationFuncs: { nextPage, prevPage, goToPage, sizePage, sortPage },
    } = this.props;
    const [sortBy, sortDirection] = sort.split(',');
    return (
      <PaginationBar>
        <PageOptionContainer>
          <PageOption
            operable={page > 1}
            onClick={() => {
              if (page > 1) goToPage(1);
            }}
          >
            First
          </PageOption>
          <PageOption
            operable={page > 1}
            onClick={() => {
              if (page > 1) prevPage();
            }}
          >
            Previous
          </PageOption>
        </PageOptionContainer>
        <PageOptionContainer>
          {Array(maxPage)
            .fill('')
            .map((val, idx) => {
              const pageOption = idx + 1;
              const currPageCheck = page !== pageOption;
              return (
                <PageOption
                  key={pageOption}
                  operable={currPageCheck}
                  onClick={() => {
                    if (currPageCheck) goToPage(pageOption);
                  }}
                >
                  {pageOption}
                </PageOption>
              );
            })}
        </PageOptionContainer>
        <PageOptionContainer>
          <PageOption
            operable={page < maxPage}
            onClick={() => {
              if (page < maxPage) nextPage();
            }}
          >
            Next
          </PageOption>
          <PageOption
            operable={page < maxPage}
            onClick={() => {
              if (page < maxPage) goToPage(maxPage);
            }}
          >
            Last
          </PageOption>
        </PageOptionContainer>
      </PaginationBar>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControl);
