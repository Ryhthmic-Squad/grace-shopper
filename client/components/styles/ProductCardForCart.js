import styled from 'styled-components';

export const ProductCardForCart = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  align-content: flex-start;
  height: 15rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  * {
    display: flex;
    flex-direction: row;
  }
`;

export const Input = styled.input`
  padding: 0.75rem;
  background: #e4e4e4;
  border-style: none;
  width: 5rem;
  margin-bottom: 0.5rem;
`;
