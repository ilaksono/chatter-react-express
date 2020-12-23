import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'styles/Animations.scss';
// core components
import Admin from "layouts/Admin.js";

import "styles/css/material-dashboard-react.css?v=1.9.0";
import { AppProvider } from 'AppContext';
const hist = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
