// theme provider goes here
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Containers/Main.jsx';
import EditUser from './Containers/Admin/EditUser.jsx';
import store from './store';
import GlobalStyle from './components/styles/GlobalStyle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminConsole from './Containers/Admin/AdminConsole.jsx';
import Login from './Containers/Login.jsx';
import AllUsers from './Containers/Admin/AllUsers.jsx';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Main />
  </Provider>,

  document.getElementById('root')
);
