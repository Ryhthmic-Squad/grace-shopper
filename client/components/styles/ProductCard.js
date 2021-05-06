import styled from 'styled-components';
import { borderColor } from 'styled-system';

export const ProductGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  bordercolor: black;
`;

export const ProductCard = styled.div`
  flex-grow: 1;
  flex-basis: 30%;
  a {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }
`;
//ugly borders are just here to help me visualize. i will remove :)

export const ProductImg = styled.div`
  max-width: 100%;
`;
export const ProductInfo = styled.div`
  align-items: center;
  justify-content: space-around;
`;

// height: 220 px;
// width: 220px;
