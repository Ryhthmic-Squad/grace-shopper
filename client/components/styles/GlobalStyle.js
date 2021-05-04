import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Merriweather', serif;
  }
  h1, h2, h3, strong {
    font-family: 'Raleway', sans-serif;
  }
  h1{
    font-size: 2rem;
  }
  h2{
    font-size: 2rem;
  }
  h1:hover,h2:hover {
    text-decoration: underline;
    color: #FFDA08
  }
  .heavy {
    height: 4px;
    background: black
  }
  hr {
    height: 1px;
    background: black;
  }
 
`;

export default GlobalStyle;
