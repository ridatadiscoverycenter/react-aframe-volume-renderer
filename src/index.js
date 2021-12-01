import React from "react";
import ReactDOM from "react-dom";

import "./firebase.js";

import App from "./App";
import { Provider } from "./context/context.js";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
