import styled from 'styled-components';

export const SingleProductPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  bordercolor: black;
`;

export const ProductCard = styled.div`
  flex-grow: 1;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  img {
    margin: auto;
  }
  hr {
    height: 1px;
    background: black;
  }
`;
