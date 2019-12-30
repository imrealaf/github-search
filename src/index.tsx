/**
 *  Index
 *
 *  @type Root
 *  @desc the root of the application where the app is mounted
 */

import "url-search-params-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.scss";
import { App } from "./components";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
