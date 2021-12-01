import React from "react";
import ReactDOM from "react-dom";

import "./firebase.js";

import App from "./App";
import { SelectorProvider } from "./context/selector-context.js";

ReactDOM.render(
  <SelectorProvider>
    <App />
  </SelectorProvider>,
  document.getElementById("root")
);
