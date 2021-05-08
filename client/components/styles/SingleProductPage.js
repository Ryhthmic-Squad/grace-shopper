import styled from 'styled-components';

export const SingleProductPage = styled.div`
  display: flex;
  padding: 2rem;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  img {
    margin: auto;
  }
  max-width: 40vw;
  padding: 4rem;
`;

export const Line = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  margin-left: -100px;
`;

export const HeroImg = styled.img`
  max-width: 45vw;
  max-height: 45vh;
  vertical-align: middle;
  padding: 6rem;
`;

export const Table = styled.table`
  padding-bottom: 2rem;
`;
