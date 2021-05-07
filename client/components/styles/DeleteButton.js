import styled from 'styled-components';

const DeleteButton = styled.button`
  display: inline-block;
  padding: 0.5rem 0rem;
  width: 4rem;
  font-size: 1rem;
  font-family: Raleway, sans-serif;
  font-weight: bold;
  line-height: 1;
  color: white;
  background-color: #6c757d;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  :not(:disabled) {
    cursor: pointer;
  }
  :hover {
    background-color: #ff0000;
  }
`;

export default DeleteButton;
