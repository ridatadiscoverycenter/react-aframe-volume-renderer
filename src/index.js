import React from "react";
import ReactDOM from "react-dom";

import "./firebase.js";

import App from "./App";
import { SelectorProvider } from "./context/selector-context.js";
import { ControlsProvider } from "./VolumeViewer-package/context/controls-context.js";

ReactDOM.render(
    <SelectorProvider>
        <ControlsProvider>
            <App />
        </ControlsProvider>
    </SelectorProvider>
    , document.getElementById("root")
);
