import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'styles/Animations.scss';
// core components
import Admin from "layouts/Admin.js";
import axios from 'axios';
import "styles/css/material-dashboard-react.css?v=1.9.0";
import { AppProvider } from 'AppContext';
import { CookiesProvider } from 'react-cookie';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
const hist = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <AppProvider>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/chat" />
        </Switch>
      </Router>
    </AppProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
