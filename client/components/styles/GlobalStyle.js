import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  #container {
    margin-top: 10rem;
  }
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
  .heavy {
    height: 4px;
    background: black
  }
  hr {
    height: 1px;
    background: black;
  }
  #showcase {
    background-image: url('landingPage.jpg');
    background-size: cover;
    background-position: center;
    height: 110vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15rem;
  }
  #showcase h4 {
    line-height: 1.5;
    text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.75);
  }
  .text-link {
    color: inherit;
    text-decoration: inherit;
  }
  a #logo {
    font-family: 'Raleway', sans-serif;
    font-size: 2rem;
    padding: 0 15rem;
  }
  a > .nav {
   align-text: baseline;
  }
`;

export default GlobalStyle;
