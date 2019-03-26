import React from "react";
import ReactDOM from "react-dom";
// import Main from "./containners/main.js";
import Index from "./containners/index.js";
import "antd/dist/antd.css";
import "./index.css";
// import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Index />
  </HashRouter>,
  document.getElementById("root")
);
