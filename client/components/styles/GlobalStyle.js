import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
    font-family: 'Merriweather', serif;
  }
  h1 {
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap');
    font-family: 'Raleway', sans-serif;
    font-size: 3rem;
  }
`;

export default GlobalStyle;
