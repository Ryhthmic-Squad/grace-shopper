import styled from 'styled-components';

export const ProductGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
`;

export const ProductCard = styled.div`
  flex-grow: 1;
  flex-basis: 30%;
  a {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10% 10% 10% 0%;
  }
`;
//ugly borders are just here to help me visualize. i will remove :)

export const ProductImg = styled.div`
  max-width: 50%;
  height: 10rem;
  margin: 5%;
  align-items: center;
`;
export const ProductInfo = styled.div`
  align-items: center;
  justify-content: flex-start;
`;

// height: 220 px;
// width: 220px;
