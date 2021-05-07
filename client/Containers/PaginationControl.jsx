import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import productPagination, {
  setProductPagination,
  nextPage,
  prevPage,
  goToPage,
  sizePage,
  sortPage,
} from '../store/product/productPagination';
import buildProductQuery from '../components/utils/buildProductQuery';
import { fetchProductList } from '../store/product/productList';

// const mapStateToProps = ({ productPagination }) => ({ productPagination });

// const mapDispatchToProps = (dispatch) => ({
//   setPagination: (productPagination) =>
//     dispatch(setProductPagination(productPagination)),
//   paginationFuncs: {
//     nextPage: () => dispatch(nextPage()),
//     prevPage: () => dispatch(prevPage()),
//     goToPage: (page) => dispatch(goToPage(page)),
//     sizePage: (size) => {
//       dispatch(sizePage(size));
//       dispatch(goToPage(1));
//     },
//     sortPage: (sort) => dispatch(sortPage(sort)),
//   },
// });

const PaginationBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: black;
  width: calc(100%);
  border-radius: ${(props) => (props.top ? '0.5rem 0.5rem 0 0' : '0.5rem')};
`;

const PageOptionContainer = styled.div`
  display: flex;
`;

const PageOption = styled.div`
  padding: 1em;
  color: ${(props) =>
    props.operable ? 'white' : props.current ? '#ffda08' : 'gray'};
  cursor: ${(props) => (props.operable ? 'pointer' : 'default')};
`;

const PaginationControl = ({ top }) => {
  const { productFilters, productPagination } = useSelector(
    ({ productFilters, productPagination }) => ({
      productFilters,
      productPagination,
    })
  );
  const history = useHistory();
  const paginate = (options) => {
    // options: { page?: INT, size?: INT, sort?: STRING }
    for (const key in productPagination) {
      if (options[key]) productPagination[key] = options[key];
    }
    const query = buildProductQuery({ productFilters, productPagination });
    history.push(`/products${query}`);
  };

  const { maxPage, page } = productPagination;
  return (
    <PaginationBar top={top}>
      <PageOptionContainer>
        <PageOption
          operable={page > 1}
          onClick={() => {
            if (page > 1) paginate({ page: 1 });
          }}
        >
          First
        </PageOption>
        <PageOption
          operable={page > 1}
          onClick={() => {
            if (page > 1) paginate({ page: page - 1 });
          }}
        >
          Previous
        </PageOption>
      </PageOptionContainer>
      <PageOptionContainer>
        {/* Figure out how to limit this to just 10 closest pages */}
        {Array(Math.min(9, maxPage))
          .fill('')
          .map((val, idx) => {
            const pageOption =
              page <= 5
                ? idx + 1
                : page > maxPage - 5
                ? idx + maxPage - 8
                : idx + page - 4;
            const currPageCheck = page !== pageOption;
            return (
              <PageOption
                key={pageOption}
                operable={currPageCheck}
                current={!currPageCheck}
                onClick={() => {
                  if (currPageCheck) paginate({ page: pageOption });
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
            if (page < maxPage) paginate({ page: page + 1 });
          }}
        >
          Next
        </PageOption>
        <PageOption
          operable={page < maxPage}
          onClick={() => {
            if (page < maxPage) paginate({ page: maxPage });
          }}
        >
          Last
        </PageOption>
      </PageOptionContainer>
    </PaginationBar>
  );
};

export default PaginationControl;
