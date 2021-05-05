// theme provider goes here
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Containers/Main.jsx';
import store from './store';
import GlobalStyle from './components/styles/GlobalStyle';
<<<<<<< HEAD
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AdminConsole from './Containers/Admin/AdminConsole.jsx';
import Login from './Containers/Login.jsx';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <GlobalStyle />
      <Main />
    </Provider>
  </Router>,
=======

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Main />
  </Provider>,
>>>>>>> main
  document.getElementById('root')
);
