// theme provider goes here
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Containers/Main';
import store from './store';
import GlobalStyle from './components/styles/GlobalStyle';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Main />
  </Provider>,
  document.getElementById('root')
);
