import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App /> 
    </Router>
    
  </Provider>,
  document.getElementById("root")
);
