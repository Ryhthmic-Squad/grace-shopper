// theme provider goes here
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Containers/Main.jsx';
import AllUsers from './Containers/Admin/AllUsers.jsx';
import EditUser from './Containers/Admin/EditUser.jsx';
import store from './store';
import GlobalStyle from './components/styles/GlobalStyle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <Main />
      <AllUsers />
      <EditUser />
    </Provider>
    <Switch>
      <Route exact path="/Admin/view/users" component={AllUsers} />
      <Route exact path="/Admin/edit/:id" component={EditUser} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
