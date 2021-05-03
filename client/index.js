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
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <Main />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Admin/dashboard" component={AdminConsole} />
        <Route exact path="/Admin/view/users" component={AllUsers} />
        <Route exact path="/Admin/view/users/edit/:id" component={EditUser} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
