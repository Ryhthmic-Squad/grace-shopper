import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
    font-family: 'Merriweather', serif;
  }
  h1, h2, h3, strong {
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap');
    font-family: 'Raleway', sans-serif;
  }
  h1{
    font-size: 3rem;
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
    background: black
  }
ul {
    list-style: none;
    padding-left: 0;
}​
`;

export default GlobalStyle;
