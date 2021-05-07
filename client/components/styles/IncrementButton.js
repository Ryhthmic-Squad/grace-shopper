import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  font-family: 'Merriweather', serif;
  font-weight: bold;
  line-height: 1rem;
  color: white;
  background-color: #6c757d;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  :not(:disabled) {
    cursor: pointer;
  }
  :hover {
    background-color: #ffda08;
    color: black;
  }
  margin: 0.5rem;
`;

export default Button;
